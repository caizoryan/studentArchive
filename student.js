class Student {
  construtor() {
    // will take in the channel id
    this.content = [];
    this.updated = false;
  }
  init() {
    // initialise -> get all the data from the student channel,
    // if all are blocks, create an object out of blocks for content
    // if channels, turn channels into projects for content
    // once done, set updated to true, to later use for onLoad()
  }
}
