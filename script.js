let channelSlug = "student-archive-k-esjl-mxn4/";

let main = new Arena(channelSlug);

let data = [];

let studentClasses = [];
// request all channels - these will be the programs
// check every channel in every program
// turn every channel into new student
// check if channel has another channel, if not content = blocks
main
  .channel()
  // returns channels -> programs
  .then((res) => {
    let programs = [];
    res.forEach((prog) => {
      programs.push(new Arena(prog.slug));
    });
    return programs;
  })
  .then((programs) => {
    programs.forEach((program) => {
      program.everything().then((data) => {
        let programTitle = data.channel.title;
        let allStudents = data.content.filter(
          (block) => block.class === "Channel"
        );
        allStudents.forEach((student) => {
          studentClasses.push(
            new Student(student.slug, student.title, programTitle)
          );
        });
      });
    });
  });

let interval = setInterval(() => {
  if (checkLoaded()) {
    init();
    console.log("loaded");
    clearInterval(interval);
  } else {
    console.log("still loading");
  }
}, 500);

// check all student classes if updated
function checkLoaded() {
  let val = true;
  for (const x of studentClasses) {
    if (!x.updated) val = false;
  }
  return val;
}

function init() {
  let mainDom = document.querySelector(".main");
  for (const x of studentClasses) {
    let code = "";
    code += `<h1>${x.name}</h1>`;
    let projects = [];
    for (const project of x.content) {
      let formatted = {
        title: project.projectMeta.title,
        content: project.projectBlocks,
      };
      projects.push(formatted);
    }

    for (const proj of projects) {
      code += `<h2>${proj.title}</h2>`;
      for (const img of proj.content) {
        if (img.class === "Image")
          code += `<img style="height: 200px" src="${img.image.display.url}" alt="">`;
      }
    }
    mainDom.innerHTML += `<div class="block">${code}</div>`;
  }
  // construct data structure
  for (const x of studentClasses) {
    //link
    let links = [];
    for (const project of x.content) links.push(project.projectMeta.title);
    links.push(x.program);

    //images
    let images = [];
    let projects = [];
    for (const project of x.content) {
      projects.push(project.projectBlocks);
    }

    for (const proj of projects) {
      for (const img of proj) {
        if (img.class === "Image") images.push(img.image.display.url);
      }
    }

    data.push({ name: x.name, links: links, images: images });
  }
  // call p5 init
  let myp5 = new p5(s, "container");
}

// main.channel().then((result) => {
//   console.log(result);
// });
