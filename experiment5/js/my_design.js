/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Sunset", 
        assetUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasOQB-ONfsisAGcyJg6uDK2ePu0jirX_WGw&s",
        credit: "Jim Grant"
      },
      {
        name: "Spotify Logo",
        assetUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEUbFBMd2mMd3mUd42cbAA4d4GUbEhIaAAod5GcaAAsbDxEaAAMaAAAaAAcbAA8bAAobCRAjvVoi0GEjzGAfABEjZzcjsFQjn00jkEcjpE8eAA0jxFwh2GQjcjsjm0sjeD0jhEIhOyUiXDIgJh0fHRoiRCkhMSEifT8jVjAfFBcjWTEiABMVAAAjiEQiQCcjtVYiTSwkazkbHBYbJRkza0M7STwtDCJE1XNEuGlClltAaUoyIiskJiAgMCEkERsutlwmHyA0lVM7QToxLS0tRzIwolUwOS8nPCozq1oxb0FKbFEyeUc32G4qAB1Bx21Wnmu/AlofAAAOD0lEQVR4nO2dCXPaSBbHTbeultToACQEkriMAdsYiLM7s1k7cWY268xkdvf7f5vt5rDBlpBad6r0q1SScpVBf/X13uvXry8uampqampqampqampqampqampqan4yBEGQKeRfoexnyRi5yWkiVnqc/OH+/n7yQeY0rGAsIiT/9FJlDmlKb9QZ2lbfBfAF0DANy599/Nvfb28x+lllkpZSJp2u1eIlngcANE4hP+F5CH759R+f/nkrcnLZj8uIoGvKg+eYkGprnIPohPCX75sHFf08bSkgUZv7Lcif13aik4cte9wTuZ9BpIzw2GmwyDs0Jmw4Y03UyxZwHoFTRr4LWdW9qCQi12qFG1JGvU1fSipvL1Lqez1UzXlHxpddl7lzBmjk3e4lrp5GGV85PJ9a3g6ed+4rplHGj1bi0RcEgM6kQhoF7cLJVN9Oo71AZSvb09SWIKv+eQwPhj2ubHEEWRmbeejbajTHauldlZOtlOvDWSTrotyuKiibRo76GtTUGZTZjM2mJeWqjyIZl6U1o7Z28xqBxwDQUUrRJ6jd/Btwh+RoJRjkOreCBQkkk2prUvi6wV3ltkYEARpzXKxAbRzhu2cOHBQ6GPGsqCH4itRVC3McC5xjjoGOUpBEQXWKm2OO4VdaIRIFxSpyjjmRaPQKsG8EZVWWQCKx38u9FUsVSFsx744qqKV10b3EFc5XouqUK5BItNQ8BSp+ObPoMdDPUWIZC/17pFluBhwal9+CFHidk8Ooj8oegwfAYy7OlNx2Cza2QwFmO4cJVVCMqgjMaUJVutUYhDukYeazDZpXYRp9BU4zHorCZ7dsTacAM2MLVf1SnUG4g3cyHYrij2r1UYo0zjA4JT9VrQUpboZLRvX6KIV3MotNoY/V66MUaZ6R9Sbc/FW2lmCAmZE7rHytij36Fn4pZiFQ/r2Kg3AHuMgiMnX7nakJtxl5PISQ/A0aruuarkn+kP80Xn4ekMiXUKGTgfEm/xbTHt3mGkK3b/lLb7x+vLy56Smn4PbNYjIde0PfMVoNGJ3WFw0cpW/E218jm3CbX2iu7OF41FawhhCHdDkoD1i4EGQdcZxGM2j1u/HMX+1zM5MqBFbqFSOiCam4hmEP1p+JNI7TGeY2QUY0V7g92iytFmRP9dshpbbAb38N/+ZtzqT3rBFtLNLesM0jbs+HliklaEywStmI4RMpgKbd0RWNyyRXW9A5UZl4TktibUtplK4R8bfgUQiAPVWyTniVqcqB1YAsk3fK6VToBX8sbyxwPjvrRGVv7psMwxJepplOuUHg6yS+WY57QIKO1LtuK25L8t001qnaD3qVoJ/7hjMVGTfZ2E1hnerTQKcCphzcMb8c4WsLxOitsNNM/CWiE9iERq57I0cg3Jy1IhsSrBLPNYIW+In8srgsLIFT5lbUiISJV+OQfQo+Ra9IgI7v/fP5q/wgacQmuJMShQXnJ8mi3m2c0Zi8m2rBMdLkrywxAmovz2jkE8ak9HVweAbY0Z418SE4AkKaSKB/IU0jXkVT15OtpERjN9RqTTpuUDfkrbm90OfQiRmNsaI9Pc873mzZ9X3b2WL7fnc59DbX08cblbpYHKtUQbwIy2YFdrK5Twlc7ukrG75vxJ0rtFh7S2fVdw++/NabP7D7AYSS2zKc7uB6gqlQBp2y2gluRtBKtH7JT6GeIT86GYnEL8BP46HTdyUYK0Kxj3SAvrXsEJ0otn+CRsEfCB+S9H1uc2b6mu6PexAbEvfWS+rbJXHuaODDNXzvTsMo1qLG3QUbyl6SyS9krdi/NP9B0ciQ09ZLAyT1z191Sg2je92OoxIvgyQCJ0lYUWmde24e9h3fXiU4aBgik3RaozvFYvO8yBB/LslAlC8jYmzb2SMTda8qJdfptPFZxxoHdq0kTmKzU0qkmzgTlndOJArspknsrNDVMHeoyE5PDGkULlhhAjdYW5UYzAfQ9a+UwGZBdqBHZ2nMChWzcF2nzywZnaDOGhJ2aDGHHYTPpSeXAGh67zTKz8GWG99mVaivS1e41TjQTjWqVvDgkZg3MM5aNNGP9mKGHpFoddm24+tjKYOQF88+mQZPWTGkUdu60TIs218OZ96mQ9lsBrNh1yc2uQmYt5yguTlo1NVhWM/iZ6wKNZ/xfdM9Gr618mfjESJOw9YbJDQpO1dRFIlf1Xuadob2yqRbMTG/AcBWRxXJ76trI9wZ6LJOpmJIfw8T99eXrz/+daMSP+F80Zmta4ywcjP1fMONKZPukQyX9rmwG3BYFeK4mYhEXf/bj39rihjPOzgoJb4yxo+e36e9Ns7XnH8Z7LGaeMshIIbkZkG6UMINKFrDpj2mKtOaF6DPqjA4VPrmU6Gzxqk3oASEsOA5jZQn+k3WJb8d/X3AvMpqA0rgNDxPURSFwtiGgh654AOzneX2BS1LtLZTVH5hNGqE8CDNAWmaedhU13AnMoYfAmvMVJ5EKcxnf0bg8GJpJmlI1s0L+TFKIT/MKfJNyzCt2DXCBaPCq0iFOe7PcOozc7Eb+JS9wjx3L2Tl4RtbwRRmhdG9NHwXkVhmTQ5pooZfEYlhybFE8mXl6RuLhc7cSx8iZ5p+wEyzi+33JuvObOk71sow+v2+QfhiOf5ytlk/9mjuVDPWrCArv3+PPx5ZZxphEblawPFJI8rEzlSfxjPiN/AvCYgn7FITTcPpbqZthdaFjNSoPhtx05MB42ohNGO4+JODRJrqs+h0V26c2P7OhTSt7nhBM6rOP4euejHLwzAr7MWw2hpjldNf07XYrGeiU2o5g3tFOx/l5nQj1ozjstqlsXwLaHh3U89uJUm526oEvGTanSY+15RyvKPHzJY3Dts8PH1EnsFXD/0M3phNlHCRAo7xttm9JxYfPzXUi14SkSHdFc2iG5HdA2aO06SEiDQG7eDKl9FGcpIoBjcsfNsC8CCk8qUa/cvsGxfp4qVJAbC/0d5bg2r00UD2FBh9Wk7MG0Bz1nvTHJFbmQR+zuqOC+3Sovq8O+yd9FUUnOV6Apwwb5GWuffEu7Ojvir04jwK++5aocvFO3izo+67XawVn305TLsHfLw1A4/Th2J/AjSuFGoT4ss4Vhuw2dsQjZMo3HkQvNtfOTTLa/Djj4+fPv3555+fPv7xY9a1LYatGQBXg/nac2K9lSTZhDH8p7faIGz0re5gfIWIE0gPB203ZBDN3SP/II7uzSi9h7VHC7XHCHNTJySmOZ/o/NP5fJq3T+Ia9mz+Ae9S8qK2ZughmfXMYTlzEIHL3kmJ3XYuJ+qVbaZP5x7To0EM73F7SGZXmD4DlcBKkkMbctbizUc3/LWGUTNZ0ij1nEdLI71I9v3R7ddHBqPoJK1rKQ51bb8GKZeztCLhc6JXrEYvtH/9J4uzMzKnTJbRpw7OwOz+7kCRDhT/I6sKIzJS18krnsfJyw5Cn0d1U/iY4fEnHS+WCavWvwn7xUYIydV/hc+2PJyMegMzkcGftM6JGJhCdvzuPoS0IT3uu8292Me7d3n66PxKebHdevLYK78my5+lRHbTgL0LuckRw6X9PP9j8PXrt2/fKY5DTbiZN17fc7s0/XChAqcNWOsvJ+2kBBzRTcF/XyP7wuFeoKVjmPSA9mnQe2+DE4vV6nrrz6oYKlNAvS7bcExxPE+Mmk35/93q+8yR3p33ci/Q2beyDXm3rCGxFLhgv1wQL1nqhCedSSkh5w+PgF+mCmk4zzcAW9Cb5nWvhiMluIy1rFzH/6hUB9bVyLwhAPlG0qgwUWn6cxwoEsXOjUx4nGRPLNs0FTQbeBoUQlTiGf5pD5oJvQJKfAGpNWtqb9cdfR735aZblIvJZwc8sN9mH0Xv0e5/N/FiuP+eGKHKTADSaqoca4zOJNjBnhz8huADHHkAJGN9pJHzYvWe9MVN4r7KLCDtOHq5ICg4J/8dGRSoKa4RG9tsx8vtURJBjZeFnUWRoTiufoYA4C+whtt2vG/l2YP5AY1oF7sLxfMrZxUzW4j3syj2JS+KDu8zhMazKSwYfFqsCsBBNtUdBM2sZsU20MqqPnvV6s8ekNaZJSkrpdeaDyKDSmYvCM2K1djdkk1JwT1cp3r9VMpomtlT/p0Ib8k6z5w4ihWbT0GqEl8BlJV9EobUybzQkTis0lDMsIbwK2Xfv3IMaCXZ841C6FXHtAFZuBTv0SdlCzsA5zmdhOCqcL67kes1LKJXhdkm16t0lGX5rchbuV4wp5Z+HVLut3aVbb6B3G9eK/laMtBv5357XomXA9K78/IXWOIFj9vLAQu531lQYwYzMxe4KkYgoZx7SKXC7iG9OFNEJU+BBd4lS8Dzgu8DBnBT8OXc6KpQTwO400wu62BBb4cXi8kc3tALrwpLF8bCbmKDXaWoSfQUPC8kPAXcec63q4bD6av8lw3JapbQQw/I6iDnORU0NoUuEu9BkzwnHCBZenHl0UOQVY81WzI2vHmd5yUMsUFtO2UFpBB9YBlw2rIUBDwypKw1AuhciOWOwGN09bqfqUYyAK9wFTroK0jp9DPrqwBao5LW+HNwynU2fZUH9mPF2u8AUkZ2nEtFzjafZA4/h1XYrQCy2B6kOMNET+TPFVSd+SUIgdsf1GIv0L6rAl3EFTZpkTnc3tgtlqakGd+RlbwrhdBE6u74ZKRMerrWtWbPSlQ19upBj09edrq0qFLQMW6wvy/RsAcjfLZATaWRm/TI711ne6ejSda5HQC4rf7K6Q7mD/TivZ9V3QuC3OQ0WmEXt5uLp6enhd7uKdvT3sz3lFQf4UDZD1JTU1NTU1NTU1NTU1NTU1NTU1PDzP8B1AAeGUsQFUQAAAAASUVORK5CYII=",
        credit: "Spotify"
      },
      {
        name: "Carina Nebula", 
        assetUrl: "data:image/jpeg;base64,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",
        credit: "James Webb Space Telescope"
      },
      {
        name: "Herbaceous Border", 
        assetUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnY0yeQI9GN9fOSM35iKtQbMOQ40O7oA2wbQ&s",
        credit: "The Fresh Flower Company"
      },
    ];
  }
  
  let drawShape;
  
  function initShape(shape) {
    drawShape = shape;
  }
  
  function initDesign(inspiration) {
    resizeCanvas(inspiration.image.width, inspiration.image.height);

    // add the original image to #original (credit: Prof. Wes Modes)
    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${width}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);
    
    // object to define all the shapes in image recreation
    let design = {
      backColor: 128,
      attributes: []
    }
     
    let i;
    
    switch(drawShape) {
    // make the shapes rectangles
    case "rectangle":
      for (i = 0; i < 6500; i++) {
        design.attributes.push({
          x: random(width),
          y: random(height),
          w: random(width/15),
          h: random(height/15),
          alpha: random(255)
        });
      }
      break;
    // make the shapes circles
    case "circle":
      for (i = 0; i < 6500; i++) {
        design.attributes.push({
          x: random(width),
          y: random(height),
          d: random(width/15),
          alpha: random(255)
        });
      }
      break;
    // make the shapes triangles
    case "triangle":
      for (i = 0; i < 6500; i++) {
        design.attributes.push({
          x: random(width),
          y: random(height),
          w: random(width/10),
          h: random(height/10),
          alpha: random(255),
        });
      }
      break;
    }
    return design;
  }
    
  function renderDesign(design, inspiration) {
    background(design.backColor);
    noStroke();
    
    let rgb;
    
    switch(drawShape) {
    // render the rectangles
    case "rectangle":
      for (let shape of design.attributes) {
        // get rgb of current coordinate
        rgb = inspiration.image.get(shape.x, shape.y);
        fill(rgb[0], rgb[1], rgb[2], shape.alpha);
        rect(shape.x, shape.y, shape.w, shape.h);
      }
      break;
    // render the circles
    case "circle":
      for (let shape of design.attributes) {
        // get rgb of current coordinate
        rgb = inspiration.image.get(shape.x, shape.y);
        fill(rgb[0], rgb[1], rgb[2], shape.alpha);
        ellipse(shape.x, shape.y, shape.d);
      }
      break;
    // render the triangles
    case "triangle":
      for (let shape of design.attributes) {
        // get rgb of current coordinate
        rgb = inspiration.image.get(shape.x, shape.y);
        fill(rgb[0], rgb[1], rgb[2], shape.alpha);
        // make an isosceles triangle
        triangle(shape.x, shape.y - (shape.h/2), shape.x - (shape.w/2), shape.y + (shape.h/2), shape.x + (shape.w/2), shape.y + (shape.h/2));
      }
      break;
    }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.backColor = mut(design.backColor, 0, 255, rate);
    
    switch(drawShape) {
    // mutate values of each rectangle
    case "rectangle":
      for (let shape of design.attributes) {
        shape.alpha = mut(shape.alpha, 0, 255, rate);
        shape.x = mut(shape.x, 0, width, rate);
        shape.y = mut(shape.y, 0, height, rate);
        shape.w = mut(shape.w, 0, width/15, rate);
        shape.h = mut(shape.h, 0, height/15, rate);
      }
      break;
    // mutate values of each circle
    case "circle":
      for (let shape of design.attributes) {
        shape.alpha = mut(shape.alpha, 0, 255, rate);
        shape.x = mut(shape.x, 0, width, rate);
        shape.y = mut(shape.y, 0, height, rate);
        shape.d = mut(shape.d, 0, width/15, rate);
      }
      break;
    // mutate values of each triangle
    case "triangle":
      for (let shape of design.attributes) {
        shape.alpha = mut(shape.alpha, 0, 255, rate);
        shape.x = mut(shape.x, 0, width, rate);
        shape.y = mut(shape.y, 0, height, rate);
        shape.w = mut(shape.w, 0, width/10, rate);
        shape.h = mut(shape.h, 0, height/10, rate);
      }
      break;
    }
  }
  
  // mutates the values with upper and lower bounds
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  