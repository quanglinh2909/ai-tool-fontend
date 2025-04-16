// components/PolygonDrawer.tsx
import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface PolygonDrawerProps {
  containerRef: React.RefObject<HTMLImageElement> | null;
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({ containerRef, points, setPoints }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [isDraggingPolygon, setIsDraggingPolygon] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [cursor, setCursor] = useState<string>('crosshair');
  const [isHoveringPoint, setIsHoveringPoint] = useState(false);
  const [isHoveringPolygon, setIsHoveringPolygon] = useState(false);

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