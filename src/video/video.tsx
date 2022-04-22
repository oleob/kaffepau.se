import Hls from 'hls.js';

export const loadVideo = () => {
    var video = document.getElementById('video') as HTMLMediaElement;
    var videoSrc = 'https://nrkedge-od.nrk.no/od/nrkhd-osl-rr.netwerk.no/world/1430188/0/hls/msum01005322/playlist.m3u8?bw_low=10&bw_high=6000&bw_start=1800&no_iframes&no_audio_only&no_subtitles';
    let hls: Hls | undefined;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      video && hls.attachMedia(video);
    }
    else if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
    return hls;
}