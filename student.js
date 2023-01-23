// to do -[30]
class Student {
  constructor(slug, program) {
    // will take in the channel id
    this.program = program;
    this.slug = slug;
    this.arena = new Arena(slug);
    this.content = [];
    this.projects = [];
    this.updated = false;
    this.init();
  }
  init() {
    this.arena.everything().then((res) => {
      let foundChannel = false;
      res.forEach((content) => {
        if (content.class === "Channel") foundChannel = true;
      });

      // if channels, turn channels into projects for content
      if (foundChannel) {
        let chans = res.filter((content) => content.class === "Channel");
        chans.forEach((channels) => {
          this.projects.push(new Arena(channels.slug));
        });
        this.projects.forEach((element) => {
          element
            .everything()
            .then((res) => {
              // - [ ] format each project with a title and descriptiotn
              let project = [];
              res.forEach((block) => {
                project.push(block);
              });
              this.content.push(project);
            })
            .then(() => {
              console.log(this.content);
            });
        });
      }

      // if all are blocks, create an object out of blocks for content
      else {
        res.forEach((element) => {
          this.content.push(element);
        });
        console.log(this.content);
      }
      // once done, set updated to true, to later use for onLoad()
    });
    // initialise -> get all the data from the student channel,
  }
}
