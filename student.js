class Student {
  constructor(slug, name, program) {
    // will take in the channel id
    this.name = name;
    this.program = program;
    this.slug = slug;
    this.arena = new Arena(slug);
    this.content = [];
    this.projects = [];
    this.updated = false;
    this.init();
  }
  init() {
    this.arena
      .everything()
      .then((res) => {
        let foundChannel = false;
        res.content.forEach((content) => {
          if (content.class === "Channel") foundChannel = true;
        });

        // if channels, turn channels into projects for content
        if (foundChannel) {
          let chans = res.content.filter(
            (content) => content.class === "Channel"
          );
          chans.forEach((channels) => {
            this.projects.push(new Arena(channels.slug));
          });
          this.projects.forEach((element) => {
            element.everything().then((res) => {
              let project = [];
              let projectMeta = res.channel;
              res.content.forEach((block) => {
                project.push(block);
              });
              let fullProject = {
                projectMeta: projectMeta,
                projectBlocks: project,
              };
              this.content.push(fullProject);
            });
          });
        }

        // if all are blocks, create an object out of blocks for content
        else {
          let project = [];
          let projectMeta = { title: "All Projects", description: "" };
          res.content.forEach((element) => {
            project.push(element);
          });
          let fullProject = {
            projectMeta: projectMeta,
            projectBlocks: project,
          };
          this.content.push(fullProject);
        }
      })
      .then(() => (this.updated = true));
    // initialise -> get all the data from the student channel,
  }
}
