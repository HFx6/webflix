"use client";
import React, { useRef } from "react";
import JWPlayer from "@jwplayer/jwplayer-react";

export default function WatchMedia() {
  const jwplayer = useRef(null);

  const playlist = [
    {
      title: "Sprite Fright - Open Movie by Blender Studio",
      description: "You're Watching",
      image: "https://i.ytimg.com/vi/_cMxraX_5RE/maxresdefault.jpg",
      sources: [
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.1080p.vp9.webm",
          label: "1080p",
          default: true,
        },
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.720p.vp9.webm",
          label: "720p",
        },
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.480p.vp9.webm",
          label: "480p",
        },
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.360p.vp9.webm",
          label: "360p",
        },
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.240p.vp9.webm",
          label: "240p",
        },
        {
          file: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.160p.webm",
          label: "160p",
        },
      ],
      captions: [
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BBengali%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Bangla",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BEnglish%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "English",
          kind: "captions",
          default: true,
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BGerman%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "German",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BHungarian%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Hungarian",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BItalian%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Italian",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BMalayalam%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Malayalam",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BPortugu%C3%AAs%20(Portugal)%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Portuguese",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BRussian%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Russian",
          kind: "captions",
        },
        {
          file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BSpanish%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Spanish",
          kind: "captions",
        },
      ],
      tracks: [
        {
          file: "https://cdn.jwplayer.com/strips/iYfADWO1-120.vtt",
          kind: "thumbnails",
        },
      ],
    },
  ];
  const config = {
    controls: true,
    sharing: true,
    displaytitle: true,
    displaydescription: true,
    abouttext: "webflix",
    aboutlink: "https://webflix-phi.vercel.app/",

    skin: {
      name: "netflix",
    },

    captions: {
      color: "#FFF",
      fontSize: 14,
      backgroundOpacity: 0,
      edgeStyle: "raised",
    },

   
  };
  const onReady = () => {
    const playerInstance = jwplayer.current.player;
    const buttonId = "download-video-button";
    const iconPath =
      "data:image/png;base64,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";
    const tooltipText = "Download Video";

    // Call the player's `addButton` API method to add the custom button
    playerInstance.addButton(
      iconPath,
      tooltipText,
      buttonClickAction,
      buttonId
    );

    // This function is executed when the button is clicked
    function buttonClickAction() {
      const playlistItem = playerInstance.getPlaylistItem();
      const anchor = document.createElement("a");
      const fileUrl = playlistItem.file;
      anchor.setAttribute("href", fileUrl);
      const downloadName = playlistItem.file.split("/").pop();
      anchor.setAttribute("download", downloadName);
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    // Move the timeslider in-line with other controls
    const playerContainer = playerInstance.getContainer();
    const buttonContainer = playerContainer.querySelector(
      ".jw-button-container"
    );
    const spacer = buttonContainer.querySelector(".jw-spacer");
    const timeSlider = playerContainer.querySelector(".jw-slider-time");
    buttonContainer.replaceChild(timeSlider, spacer);

    // Detect adblock
    playerInstance.on("adBlock", () => {
      const modal = document.querySelector("div.modal");
      modal.style.display = "flex";

      document
        .getElementById("close")
        .addEventListener("click", () => location.reload());
    });

    // Forward 10 seconds
    const rewindContainer = playerContainer.querySelector(
      ".jw-display-icon-rewind"
    );
    const forwardContainer = rewindContainer.cloneNode(true);
    const forwardDisplayButton =
      forwardContainer.querySelector(".jw-icon-rewind");
    forwardDisplayButton.style.transform = "scaleX(-1)";
    forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
    const nextContainer = playerContainer.querySelector(
      ".jw-display-icon-next"
    );
    nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

    // control bar icon
    playerContainer.querySelector(".jw-display-icon-next").style.display =
      "none"; // hide next button
    const rewindControlBarButton =
      buttonContainer.querySelector(".jw-icon-rewind");
    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
    forwardControlBarButton.style.transform = "scaleX(-1)";
    forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
    rewindControlBarButton.parentNode.insertBefore(
      forwardControlBarButton,
      rewindControlBarButton.nextElementSibling
    );

    // add onclick handlers
    [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
      button.onclick = () => {
        playerInstance.seek(playerInstance.getPosition() + 10);
      };
    });
  };
  return (
    <>
      <JWPlayer
        ref={jwplayer}
        library="https://content.jwplatform.com/libraries/KB5zFt7A.js"
        config={config}
        onReady={onReady}
        playlist={playlist}
      />
    </>
  );
}
