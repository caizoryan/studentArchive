let channelSlug = "student-archive/";

let main = new Arena(channelSlug);

let data = {};

let studentClasses = [];
// request all channels - these will be the programs
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
      program.channel().then((allStudents) => {
        let students = [];
        allStudents.forEach((student) => {
          students.push(new Student(student.slug, "ok"));
        });
      });

      /* .then((students) => { students.forEach((s) => {
            s.everything().then((res) => {
              console.log(res);
            });
          });
        }); */
    });
  });

// check every channel in every program
// turn every channel into new student
// check if channel has another channel, if not content = blocks
