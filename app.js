var memeConfigs = [
  {
    image: "image1-compressed.jpg",
    width: 4032,
    height: 3024,
    boxes: [
      { width: 285, height: 460, x: 770, y: 790, rotate: "8deg" },
      { width: 285, height: 460, x: 1080, y: 900, rotate: "4deg" },
      { width: 255, height: 450, x: 1370, y: 925, rotate: "1deg" },
      { width: 255, height: 430, x: 1650, y: 850, rotate: "0" },
      { width: 255, height: 430, x: 1920, y: 830, rotate: "0" },
      { width: 255, height: 440, x: 2225, y: 875, rotate: "9deg" },
      { width: 255, height: 430, x: 2530, y: 825, rotate: "-2deg" },
      { width: 255, height: 420, x: 2820, y: 780, rotate: "-3deg" },
      { width: 260, height: 420, x: 3125, y: 790, rotate: "-3.5deg" }
    ]
  },
  {
    image: "image2-compressed.jpg",
    width: 4032,
    height: 3024,
    boxes: [
      { width: 285, height: 460, x: 770, y: 790, rotate: "8deg" },
      { width: 285, height: 460, x: 1080, y: 900, rotate: "4deg" },
      { width: 255, height: 450, x: 1370, y: 925, rotate: "1deg" },
      { width: 255, height: 430, x: 1650, y: 850, rotate: "0" },
      { width: 255, height: 430, x: 1920, y: 830, rotate: "0" },
      { width: 255, height: 440, x: 2225, y: 875, rotate: "9deg" },
      { width: 255, height: 430, x: 2530, y: 825, rotate: "-2deg" },
      { width: 255, height: 420, x: 2820, y: 780, rotate: "-3deg" },
      { width: 260, height: 420, x: 3125, y: 790, rotate: "-3.5deg" }
    ]
  }
];

function MitsuhikoApp() {
  return {
    clearChildren: function(parentNode) {
      while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
      }
    },

    drawText: function() {
      this.clearChildren(this.lettersNode);

      var widthFactor = this.imageNode.width / this.config.width;
      var heightFactor = this.imageNode.height / this.config.height;

      var numBoxNodes = this.config.boxes.length;
      var numTextNodes = this.text.length;

      var textOffset = 0;
      if (this.alignText == "center") {
        textOffset =
          numTextNodes < numBoxNodes
            ? parseInt((numBoxNodes - numTextNodes) / 2, 10)
            : 0;
      } else if (this.alignText == "right") {
        textOffset = numBoxNodes - numTextNodes;
      }

      for (var i = 0, boxConfig, boxNode, textNode; i < numBoxNodes; i++) {
        boxConfig = this.config.boxes[i];
        boxNode = document.createElement("div");
        boxNode.style.width = boxConfig.width * widthFactor;
        boxNode.style.height = boxConfig.height * heightFactor;
        boxNode.style.left = boxConfig.x * widthFactor;
        boxNode.style.top = boxConfig.y * heightFactor;
        boxNode.style.transform = "rotate(" + boxConfig.rotate + ")";
        boxNode.style.fontSize = "6vw";
        boxNode.className = "letter";

        textNode = document.createElement("div");
        textNode.innerText = this.text[i - textOffset] || "";
        boxNode.appendChild(textNode);
        this.lettersNode.appendChild(boxNode);
      }
    },

    init: function(config) {
      this.config = config;
      this.text =
        window.decodeURIComponent(window.location.hash.slice(1)) || "mitsuhiko";

      this.alignText = "center";
      var containerNode = (this.containerNode = document.getElementById(
        "container"
      ));
      this.clearChildren(containerNode);

      var imageNode = (this.imageNode = this.imageNode = document.createElement(
        "img"
      ));
      imageNode.src = config.image;
      imageNode.className = "background";
      containerNode.appendChild(imageNode);

      var lettersNode = (this.lettersNode = document.createElement("div"));
      lettersNode.className = "letters";
      containerNode.appendChild(lettersNode);

      imageNode.onload = function() {
        this.drawText();
      }.bind(this);

      window.onhashchange = function() {
        this.text = window.decodeURIComponent(window.location.hash.slice(1));
        this.drawText();
      }.bind(this);

      window.onresize = function() {
        this.drawText();
      }.bind(this);
    }
  };
}

function randomChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

window.onload = function() {
  var app = MitsuhikoApp();
  app.init(randomChoice(memeConfigs));
};
