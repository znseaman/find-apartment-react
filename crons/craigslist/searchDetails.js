async function searchDetails(client, listing) {
  return client.details(listing).then(async res => {
    console.log(`Search Details Date:`, new Date(Date.now()));
    return res;
  });
}

module.exports = searchDetails;