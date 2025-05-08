export function getRtspEncode(rtsp: string, userName: string, password: string): string {
    const encodedPassword = encodeURIComponent(password);
    const startRtsp = `rtsp://${userName}:${encodedPassword}@`;

    if (rtsp.startsWith(startRtsp)) {
        return rtsp;
    }

    return rtsp.replace("rtsp://", startRtsp);
}