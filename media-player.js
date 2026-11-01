
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".media-slot").forEach(slot => {
    const src = slot.dataset.src;
    const type = slot.dataset.type;

    // Keep the coming-soon message if no file is supplied.
    if (!src) return;

    let player;

    if (type === "audio") {
      player = document.createElement("audio");
      player.controls = true;
      player.preload = "metadata";
    } else if (type === "video") {
      player = document.createElement("video");
      player.controls = true;
      player.playsInline = true;
      player.preload = "metadata";

      if (slot.dataset.poster) {
        player.poster = slot.dataset.poster;
      }
    } else {
      return;
    }

    player.src = src;
    player.className = "media-player";

    // Replace the placeholder with the real player.
    slot.replaceChildren(player);
  });
});
