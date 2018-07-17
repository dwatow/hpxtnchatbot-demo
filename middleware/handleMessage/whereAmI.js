module.exports = function(msg_text, respons_message) {
  console.log('quick location');

  respons_message["text"] = `在地圖指一下你在哪`
  respons_message["quick_replies"] = [{
    "content_type": "location"
  }]
  return respons_message
}
