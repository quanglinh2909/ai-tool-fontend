export interface GetRtspModel {
    ip: string
    htt_port: number
    username: string
    password: string
  }
  

  export interface CreateCameraModel {
    name: string
    ip: string
    htt_port: number
    username: string
    password: string
    rtsp: string
    setting: Setting
  }
  
  export interface Setting {
    is_detect_plate: boolean
    is_detect_face: boolean
    is_direction_face: boolean
    is_direction_plate: boolean
    direction_angle_face: number
    direction_angle_plate: number
    direction_deviation_face: number
    direction_deviation_plate: number
    points_face: any[]
    points_plate: any[]
  }
  