AFRAME.registerComponent("drive",{
    init: function(){
        var gameStateValue = this.el.getAttribute("gameState");
        if(gameStateValue == "play"){
            this.driveCar();
        }
    },

    isVelocityActive: function(){
        return(Math.random()<0.25);
        
    },

    driveCar: function(){
        var multiply = 10;
        var wheelRotation = 0;

        //keydown events
        Window.addEventListener("keydown",function(e){
            //steering wheel rotates on left and right arrow key press
            var wheel = document.querySelector("#control-wheel");
            if(e.code == "ArrowRight" && wheelRotation>-40){
                wheelRotation-=5;
                wheel.setAttribute("rotation", {x: 0, y:0, z: wheelRotation});
            }

            if(e.code == "ArrowLeft" && wheelRotation>40){
                wheelRotation+=5;
                wheel.setAttribute("rotation", {x: 0, y:0, z: wheelRotation});
            }

            //camera movement control
            var cameraRig = document.querySelector("#camera-rig");
            var cameraRotation = cameraRig.getAttribute("rotation");
            var cameraPosition = cameraRig.getAttribute("position");
            var cameraMoveControl = cameraRig.getAttribute("movement-controls");

            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005});

            var cameraDirection = new THREE.vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if(e.code == "ArrowRight"){
                cameraRotation.y -= 5;
                cameraRig.setAttribute("rotation", {x: 0, y:cameraRotation, z:0});
                cameraRig.setAttribute("movement-control", {"speed": cameraMoveControl.speed + 0.005})
            }

            if(e.code == "ArrowLeft"){
                cameraRotation.y += 5;
                cameraRig.setAttribute("rotation", {x: 0, y:cameraRotation, z:0});
                cameraRig.setAttribute("movement-control", {"speed": cameraMoveControl.speed + 0.005})
            }

            //speed up/down
            if(e.code == "ArrowUp"){
                multiply += 0.5;
                if(multiply<= 100 && cameraPosition.z > -500){
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005});
                    
                    var accelerateCar = document.querySelector("#control-acce");
                    accelerateCar.setAttribute("material", "color", "green");

                    var carSpeed = document.querySelector("#speed");
                    carSpeed.setAttribute("text", {value: multiply});
                }
            }

            if(e.code == "Space"){
                cameraRig.setAttribute("movement-controls", {"speed": 0});

                var stopCar = document.querySelector("#control-brake");
                stopCar.setAttribute("material", "color", "red");
            }
        })
        Window.addEventListener("keyup",function(e){
            var cameraRig = document.querySelector("#camera-rig");
            var cameraMoveControl = cameraRig.getAttribute("movement-controls");
            var cameraDirection = new THREE.vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if(e.code == "Space"){    
                var startCar = document.querySelector("#control-brake");
                startCar.setAttribute("material", "color", "grey");
            }

            if(e.code == "ArrowUp"){
                if(multiply>10){
                    multiply-=.1;
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                }

                var accelerateCar = document.querySelector("#control-acce");
                accelerateCar.setAttribute("material", "color", "grey");
            }
       })

    }
})

