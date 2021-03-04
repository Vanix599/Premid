const presence = new Presence({
  clientId: "812754264530485268"
});



var browsingStamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  
  if (window.location.pathname.startsWith("/view/")) {
    presenceData.details = "Watching: " + document.querySelector("h2.page_title").textContent;
  const video: HTMLVideoElement = document.querySelector("video");
   var timestamps = presence.getTimestampsfromMedia(video);
   presenceData.startTimestamp = timestamps[0];
   presenceData.endTimestamp = timestamps[1];
   if (video.paused) {
    presenceData.state = "Paused";
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
   }

  } else if (window.location.pathname.startsWith("/animelist/")) {
    presenceData.details = "Searching for Anime"; 
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.startsWith("/search/")) {
    presenceData.details = "Searching: " + document.querySelector("h2.page_title > b").textContent;
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.startsWith("/anime/")) {
    presenceData.details = "Reading: " + document.querySelector("div.col-md-9.col-lg-9 > h2").textContent;
    presenceData.startTimestamp = browsingStamp;
  } else{
    presenceData.details = "Idle...";
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
