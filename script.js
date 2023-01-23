let channelSlug = "student-archive/";

let main = new Arena(channelSlug);

let data = {};

class Student {
  constructor(name, program, description, content) {
    this.name = name;
  }
}

let programs = [];
let students = [];
// request all channels - these will be the programs
main
  .channel()

  // returns channels -> programs
  .then((res) => {
    res.forEach((prog) => {
      programs.push(new Arena(prog.slug));
    });
  })
  .then(() => {
    programs.forEach((program) => {
      program
        .channel()
        .then((allStudents) => {
          allStudents.forEach((student) => {
            students.push(new Arena(student.slug));
            console.log(students);
          });
        })
        .then(() => {
          students.forEach((s) => {
            s.everything().then((res) => {
              console.log(res);
            });
          });
        });
    });
  });

// check every channel in every program
// turn every channel into new student
// check if channel has another channel, if not content = blocks
