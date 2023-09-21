// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID += 1;
    this.name = name;
    this.users[this.currentID] = { id: this.currentID, name: name };
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    if (!this.users[userID]) {
      return null;
    }
    return this;
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) {
      return false;
    }
    this.follows[userID1].add(userID2);
    return true;

  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();
    for (let id in this.follows) {
      if (this.follows[id].has(userID)) {
        followers.add(Number(id))
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let queue = [[userID]];
    let visited = new Set();
    visited.add(userID);
    let rec = [];

    while (queue.length) {
      let path = queue.shift();
      let currId = path[path.length - 1];

      if (path.length > degrees + 2) break;

      if (path.length > 2) rec.push(currId);

      for (let followId of this.follows[currId]) {
        if (!visited.has(followId)) {
          visited.add(followId);
          let newPath = path.concat([followId]);
          queue.push(newPath);
        }
      }
    }
    return rec;
  }
}

module.exports = SocialNetwork;
