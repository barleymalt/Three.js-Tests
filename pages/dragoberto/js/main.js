let index = 0;

function changeModel() {
  // Disable all models
  document.querySelector("#modelIntro").setAttribute("visible", false);
  document.querySelector("#modelMoto").setAttribute("visible", false);
  document.querySelector("#modelJacopo").setAttribute("visible", false);
  document.querySelector("#modelDragoberto").setAttribute("visible", false);
  document.querySelector("#modelFamiglia").setAttribute("visible", false);

  if (++index > 4) index = 0;

  // Enable next model
  switch (index) {
    case 0:
      document.querySelector("#modelIntro").setAttribute("visible", true);
      changeButtonText("buon compleanno!", "avanti");
      break;
    case 1:
      document.querySelector("#modelMoto").setAttribute("visible", true);
      changeButtonText("brum! brum!", "avanti");
      break;
    case 2:
      document.querySelector("#modelDragoberto").setAttribute("visible", true);
      changeButtonText("gnam!", "avanti");
      break;
    case 3:
      document.querySelector("#modelJacopo").setAttribute("visible", true);
      changeButtonText("coi figli", "avanti");
      break;
    case 4:
      document.querySelector("#modelFamiglia").setAttribute("visible", true);
      changeButtonText("tra coetanei", "ricomincia!");
      break;
  }
}

// Fix sticky touch hover
function stickyBtnFix() {
  var el = this;
  var par = el.parentNode;
  var next = el.nextSibling;
  par.removeChild(el);
  setTimeout(function () {
    par.insertBefore(el, next);
  }, 0);
}

// Delay show button
function delayshowButton() {
  document.getElementById("continue-btn").style.display = "none";

  lastTimedAction = setTimeout(function () {
    document.getElementById("continue-btn").style.display = "inline-block";
    changeButtonText("tanti augusti", "avanti");
  }, 5000);
}

let lastTimedAction;

function changeButtonText(string1, string2) {
  document.getElementById("continue-btn").innerHTML = string1;

  // Clear the timeout action before calling the delayed text change
  if (lastTimedAction != null) {
    clearTimeout(lastTimedAction);
    lastTimedAction = null;
  }

  // Call the delayed change of text
  lastTimedAction = setTimeout(function () {
    document.getElementById("continue-btn").innerHTML = string2;
  }, 8000);
}

// Register labert material
AFRAME.registerComponent("lambert", {
  schema: {
    color: {
      default: "#fff",
    },
  },
  init: function () {},
  update: function (oldData) {
    let mesh = this.el.getObject3D("mesh");
    if (!mesh) {
      this.el.addEventListener("model-loaded", (e) => {
        this.update.call(this, this.data);
      });
      return;
    }
    this.changeColor(mesh, this.data.color);
  },
  changeColor: function (mesh, color) {
    var material = new THREE.MeshBasicMaterial({
      color: color,
    });

    mesh.traverse(function (node) {
      if (node.type != "Mesh") return;
      let tmp = node.material;
      node.material = material;
      tmp.dispose();
    });
  },
});
