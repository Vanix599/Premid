const presence = new Presence({
  clientId: "817132057574506537"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (window.location.pathname.endsWith("/emotes")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Emotes";
  } else if (window.location.pathname.endsWith("/partners")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Partners";
  } else if (window.location.pathname.endsWith("/lunarmasks")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Masks";
  } else if (window.location.pathname.endsWith("/lunarbandannas")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Bandannas";
  } else if (window.location.pathname.endsWith("/lunarhats")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Hats";
  } else if (window.location.pathname.endsWith("/Wings")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Wings";
  } else if (window.location.pathname.endsWith("/lunar")) {
    presenceData.details = "Viewing a Category:";
    presenceData.state = "Cape";
  } else if (window.location.pathname.startsWith("/category/")) {
    presenceData.details = "Viewing a Item";
    presenceData.state = window.location.href.split("/").pop();
  } else if (window.location.pathname.startsWith("/checkout/")) {
    presenceData.details = "Payment";
  }
  else {
    presenceData.details = "Main..";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
