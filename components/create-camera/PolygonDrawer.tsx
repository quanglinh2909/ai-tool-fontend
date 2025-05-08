// components/PolygonDrawer.tsx
import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

export interface Arrow {
  start: Point;
  end: Point;
}

interface PolygonDrawerProps {
  containerRef: React.RefObject<HTMLImageElement> | null;
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  arrowAngle: number; // Angle in degrees (0-360)
  showArrow: boolean;
  arrow: Arrow | null;
  setArrow: React.Dispatch<React.SetStateAction<Arrow | null>>;
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({
  containerRef,
  points,
  setPoints,
  arrowAngle = 0, // Default to 0 degrees
  showArrow = true,
  arrow = null,
  setArrow = () => { }
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [isDraggingPolygon, setIsDraggingPolygon] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [cursor, setCursor] = useState<string>('crosshair');
  const [isHoveringPoint, setIsHoveringPoint] = useState(false);
  const [isHoveringPolygon, setIsHoveringPolygon] = useState(false);

  // Calculate polygon centroid
  const calculateCentroid = (points: Point[]): Point => {
    if (points.length === 0) return { x: 0, y: 0 };

    let sumX = 0;
    let sumY = 0;

    points.forEach(point => {
      sumX += point.x;
      sumY += point.y;
    });

    return {
      x: sumX / points.length,
      y: sumY / points.length
    };
  };

  // Calculate the arrow endpoint based on angle and ensures it's within the polygon
  const calculateArrowEndpoint = (centroid: Point, angle: number, points: Point[]): Point => {
    if (points.length < 3) return centroid;

    // Convert angle from degrees to radians
    const radians = (angle * Math.PI) / 180;

    // Find the maximum possible length for the arrow
    let maxLength = 0;

    // This is a simplified approach - for a more accurate approach we would
    // calculate the exact intersection with the polygon boundary
    points.forEach(point => {
      const dx = point.x - centroid.x;
      const dy = point.y - centroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      maxLength = Math.max(maxLength, distance);
    });

    // Use 70% of the max length to ensure the arrow stays within the polygon
    const arrowLength = maxLength * 0.5;

    // Calculate endpoint using trigonometry
    const endPoint = {
      x: centroid.x + arrowLength * Math.cos(radians),
      y: centroid.y + arrowLength * Math.sin(radians)
    };

    // Ensure the endpoint is inside the polygon
    if (!isPointInPolygon(endPoint) && points.length >= 3) {
      // If not in polygon, reduce length until it is
      for (let factor = 0.6; factor >= 0.1; factor -= 0.1) {
        const shorterEndPoint = {
          x: centroid.x + (maxLength * factor) * Math.cos(radians),
          y: centroid.y + (maxLength * factor) * Math.sin(radians)
        };

        if (isPointInPolygon(shorterEndPoint)) {
          return shorterEndPoint;
        }
      }

      // If we can't find a good endpoint, just return one very close to the centroid
      return {
        x: centroid.x + 10 * Math.cos(radians),
        y: centroid.y + 10 * Math.sin(radians)
      };
    }

    return endPoint;
  };

  // Update arrow when polygon changes or angle changes
  useEffect(() => {
    if (points.length >= 3) {
      const centroid = calculateCentroid(points);
      const endPoint = calculateArrowEndpoint(centroid, arrowAngle, points);
      setArrow({ start: centroid, end: endPoint });
    } else {
      setArrow(null);
    }
  }, [points, arrowAngle]);

  // Get SVG coordinates from mouse event
  const getSvgCoordinates = (e: React.MouseEvent): Point | null => {
    if (!svgRef.current || !containerRef?.current) return null;

    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Check if point is near another point
  const isNearPoint = (p1: Point, p2: Point, threshold = 10): boolean => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy) <= threshold;
  };

  // Find the index of a point near coordinates
  const findPointIndex = (coord: Point, threshold = 10): number => {
    for (let i = 0; i < points.length; i++) {
      if (isNearPoint(points[i], coord, threshold)) {
        return i;
      }
    }
    return -1;
  };

  // Check if a point is inside the polygon
  const isPointInPolygon = (point: Point): boolean => {
    if (points.length < 3) return false;

    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x;
      const yi = points[i].y;
      const xj = points[j].x;
      const yj = points[j].y;

      const intersect = ((yi > point.y) !== (yj > point.y)) &&
        (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

      if (intersect) inside = !inside;
    }

    return inside;
  };

  // Handle mouse move over SVG
  const handleMouseMove = (e: React.MouseEvent) => {
    const coord = getSvgCoordinates(e);
    if (!coord) return;

    // Update cursor based on context
    const pointIndex = findPointIndex(coord);
    const isOverPoint = pointIndex !== -1;
    const isOverPolygon = isPointInPolygon(coord);

    setIsHoveringPoint(isOverPoint);
    setIsHoveringPolygon(isOverPolygon && !isOverPoint);

    if (isOverPoint) {
      setCursor('pointer'); // 👉
    } else if (isDraggingPolygon) {
      setCursor('grabbing'); // ✊
    } else if (isOverPolygon) {
      setCursor('grab'); // ✋
    } else {
      setCursor('crosshair'); // ➕
    }

    // Handle dragging a point
    if (activePointIndex !== null) {
      const newPoints = [...points];
      newPoints[activePointIndex] = coord;
      setPoints(newPoints);
    }
    // Handle dragging the entire polygon
    else if (isDraggingPolygon && dragStart) {
      const dx = coord.x - dragStart.x;
      const dy = coord.y - dragStart.y;

      setPoints(points.map(p => ({
        x: p.x + dx,
        y: p.y + dy
      })));

      setDragStart(coord);
    }
  };

  // Handle mouse down on SVG
  const handleMouseDown = (e: React.MouseEvent) => {
    const coord = getSvgCoordinates(e);
    if (!coord) return;

    // Right click to delete a point
    if (e.button === 2) {
      e.preventDefault();
      const pointIndex = findPointIndex(coord);
      if (pointIndex !== -1) {
        const newPoints = [...points];
        newPoints.splice(pointIndex, 1);
        setPoints(newPoints);
      }
      return;
    }

    // Left click
    if (e.button === 0) {
      const pointIndex = findPointIndex(coord);

      // If clicking on an existing point, prepare to drag it
      if (pointIndex !== -1) {
        setActivePointIndex(pointIndex);
        return;
      }

      // If clicking inside the polygon, prepare to drag the whole polygon
      if (points.length >= 3 && isPointInPolygon(coord)) {
        setIsDraggingPolygon(true);
        setDragStart(coord);
        setCursor('grabbing');
        return;
      }

      // Otherwise, add a new point
      setPoints([...points, coord]);
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setActivePointIndex(null);
    setIsDraggingPolygon(false);
    setDragStart(null);

    // Reset cursor based on current position
    if (isHoveringPoint) {
      setCursor('pointer');
    } else if (isHoveringPolygon) {
      setCursor('grab');
    } else {
      setCursor('crosshair');
    }
  };

  // Prevent context menu on right click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Update SVG dimensions when container changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef?.current && svgRef.current) {
        const { width, height } = containerRef?.current.getBoundingClientRect();
        svgRef.current.setAttribute('width', width.toString());
        svgRef.current.setAttribute('height', height.toString());
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef]);

  // Create arrowhead marker definition
  const arrowHeadId = 'arrowhead';
  const arrowHeadMarkup = (
    <defs>
      <marker
        id={arrowHeadId}
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255, 50, 50, 0.8)" />
      </marker>
    </defs>
  );

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      style={{ cursor }}
    >
      {arrowHeadMarkup}

      {/* Draw polygon */}
      {points.length > 2 && (
        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="rgba(0, 150, 255, 0.3)"
          stroke="rgba(0, 150, 255, 0.8)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}

      {/* Draw lines between points */}
      {points.length > 1 && points.map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        return (
          <line
            key={`line-${i}`}
            x1={point.x}
            y1={point.y}
            x2={nextPoint.x}
            y2={nextPoint.y}
            stroke="rgba(0, 150, 255, 0.8)"
            strokeWidth="2"
          />
        );
      })}

      {/* Draw arrow */}
      {arrow && showArrow && (
        <line
          x1={arrow.start.x}
          y1={arrow.start.y}
          x2={arrow.end.x}
          y2={arrow.end.y}
          stroke="rgba(255, 50, 50, 0.8)"
          strokeWidth="1.5"
          markerEnd={`url(#${arrowHeadId})`}
        />
      )}

      {/* Draw centroid */}
      {arrow && showArrow && (
        <circle
          cx={arrow.start.x}
          cy={arrow.start.y}
          r={4}
          fill="rgba(255, 50, 50, 0.8)"
        />
      )}

      {/* Draw points */}
      {points.map((point, i) => (
        <circle
          key={`point-${i}`}
          cx={point.x}
          cy={point.y}
          r={6}
          fill={activePointIndex === i ? "rgba(255, 100, 100, 0.8)" : "rgba(255, 255, 255, 0.8)"}
          stroke="rgba(0, 100, 200, 0.8)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

export default PolygonDrawer;