const presence = new Presence({
    clientId: "833434763834556456"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let tv, video = {
    duration: 0,
    currentTime: 0,
    paused: true
};
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(), endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "logo"
    };
    if (video != null &&
        !isNaN(video.duration) &&
        document.location.pathname.includes("/watching/")) {
        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        data.details = "Watching:";
        data.state = document.querySelector(".font-light").textContent + " • " + document.querySelector(".flex > span.text-white").textContent;
        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data, !video.paused);
    }
    else {
        data.details = (await strings).browsing;
        data.smallImageKey = "browsing";
        data.smallImageText = (await strings).browsing;
        presence.setActivity(data);
    }
});
