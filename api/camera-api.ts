import { CreateCameraModel, GetRtspModel } from "@/model/camera";
import axiosClient from "./base-api";

export const cameraApi ={
    async getRtsp(data:GetRtspModel){
        return await axiosClient.post('/ai/camera/get-rtsp', data)
    },
    async createCamera(data: CreateCameraModel){
        return await axiosClient.post('/ai/camera/create', data)
    }
}