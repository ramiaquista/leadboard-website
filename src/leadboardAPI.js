/* eslint-disable no-constant-condition */
class leadboardData {
  static refreshData = (gameID) => new Promise((resolve, reject) => {
    if (true) {
      return resolve(
        fetch(
          `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`,
        )
          .then((response) => response.json())
          .then((json) => json),
      );
    }
    return reject(new Error('Invalid URL'));
  });

  static submitNewPlayer = (gameID, user, score) => {
    fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`,
      {
        method: 'POST',
        body: JSON.stringify({
          user,
          score,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then((response) => response.json())
      .then((json) => json);
  };
}

export default leadboardData;
