module.exports = function(msg_text, respons_message) {
  let template = {
    "type": "template"
  };

  if (msg_text === "一般型範本") {
    let genericElement = {
      "title": "你想要用哪種搜尋引擎？",
      "image_url": "https://lorempixel.com/400/200/food/",
      "subtitle": "一般型範本",
      "default_action": {
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "messenger_extensions": false,
        "webview_height_ratio": "FULL"
      },
      "buttons": [{
          "type": "web_url",
          "url": "https://www.google.com",
          "title": "Google",
        },
        {
          "type": "web_url",
          "url": "https://www.yahoo.com",
          "title": "Yahoo!",
        },
        {
          "type": "web_url",
          "url": "https://www.bing.com",
          "title": "Bing",
        }
      ]
    };

    template["payload"] = {
      "template_type": "generic",
      "elements": [
        genericElement
      ]
    };
  } else if (msg_text === "清單範本") {
    let listTemplateWithImgButton = {
      "title": "有圖有按鈕",
      "image_url": "https://lorempixel.com/800/500/food/",
      "subtitle": "See all our colors",
      "default_action": {
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "webview_height_ratio": "tall"
      },
      "buttons": [{
        "title": "Shop Now",
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "webview_height_ratio": "tall"
      }]
    };

    let listTemplateWithButton = {
      "title": "有按鈕",
      // "image_url": "https://lorempixel.com/800/500/food/",
      "subtitle": "100% Cotton, 200% Comfortable",
      "default_action": {
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "webview_height_ratio": "tall"
      },
      "buttons": [{
        "title": "Shop Now",
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "webview_height_ratio": "tall"
      }]
    };

    let listTemplateWithImage = {
      "title": "無按鈕",
      "image_url": "https://lorempixel.com/800/500/food/",
      "subtitle": "100% Cotton, 200% Comfortable",
      "default_action": {
        "type": "web_url",
        "url": "https://www.facebook.com/hpxtainan/",
        "webview_height_ratio": "tall"
      }
    };

    template["payload"] = {
      "template_type": "list",
      "top_element_style": "LARGE",
      "elements": [
        listTemplateWithImgButton,
        listTemplateWithButton,
        listTemplateWithImage
      ],
      "buttons": [{
        "title": "View More",
        "type": "postback",
        "payload": "payload"
      }]
    }
  } else if (msg_text === "按鈕範本") {
    template["payload"] = {
      "template_type": "button",
      "text": "你想用哪種搜尋引擎?",
      "buttons": [{
          "type": "web_url",
          "url": "https://www.google.com",
          "title": "Google"
        },
        {
          "type": "web_url",
          "url": "https://www.yahoo.com",
          "title": "Yahoo!"
        }
      ]
    }
  } else if (msg_text === "開放社交關係圖範本") {

    const openGraphElement = {
      "url": "https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb",
      "buttons": [{
        "type": "web_url",
        "url": "https://en.wikipedia.org/wiki/Rickrolling",
        "title": "View More"
      }]
    }

    const openGraphElementMayday = {
      "url": "https://www.youtube.com/watch?v=YKiMrg6rgYQ",
      "buttons": [{
        "type": "web_url",
        "url": "https://en.wikipedia.org/wiki/Rickrolling",
        "title": "View More"
      }]
    }
    template["payload"] = {
      "template_type": "open_graph",
      "elements": [
        openGraphElement,
        // openGraphElementMayday
      ]
    }
  // } else if (msg_text === "媒體範本") {
  //   const mediaElement = {
  //     "media_type": "image",
  //     "attachment_id": "a.386114131442685.100799.270024299718336/386114721442626",
  //     //"https://www.facebook.com/hpxtainan/photos/a.386114131442685.100799.270024299718336/386114721442626/?type=3&theater"
  //     //https://business.facebook.com/<PAGE_NAME>/photos/<NUMERIC_ID>
  //
  //
  //   };
  //
  //   template["payload"] = {
  //     "template_type": "image",
  //     "elements": [
  //       mediaElement,
  //       mediaElement,
  //       mediaElement
  //     ]
  //   }
  } else if (msg_text === "收據範本") {
    template["payload"] = {
      "template_type": "receipt",
      "recipient_name": "Stephane Crozatier",
      "order_number": "12345678902",
      "currency": "USD",
      "payment_method": "Visa 2345",
      "order_url": "http://petersapparel.parseapp.com/order?order_id=123456",
      "timestamp": "1428444852",
      "address": {
        "street_1": "1 Hacker Way",
        "street_2": "",
        "city": "Menlo Park",
        "postal_code": "94025",
        "state": "CA",
        "country": "US"
      },
      "summary": {
        "subtotal": 75.00,
        "shipping_cost": 4.95,
        "total_tax": 6.19,
        "total_cost": 56.14
      },
      "adjustments": [{
          "name": "New Customer Discount",
          "amount": 20
        },
        {
          "name": "$10 Off Coupon",
          "amount": 10
        }
      ],
      "elements": [{
          "title": "Classic White T-Shirt",
          "subtitle": "100% Soft and Luxurious Cotton",
          "quantity": 2,
          "price": 50,
          "currency": "USD",
          "image_url": "https://lorempixel.com/800/800/food/"
        },
        {
          "title": "Classic Gray T-Shirt",
          "subtitle": "100% Soft and Luxurious Cotton",
          "quantity": 1,
          "price": 25,
          "currency": "USD",
          "image_url": "https://lorempixel.com/800/800/food/"
        }
      ]
    }
  } else if (msg_text === "航空公司登機證範本") {
    template["payload"] = {
      "template_type": "airline_boardingpass",
      "intro_message": "You are checked in.",
      "locale": "en_US",
      "boarding_pass": [{
        "passenger_name": "SMITH\/NICOLAS",
        "pnr_number": "CG4X7U",
        "seat": "74J",
        "logo_image_url": "https:\/\/www.example.com\/en\/logo.png",
        "header_image_url": "https:\/\/www.example.com\/en\/fb\/header.png",
        "qr_code": "M1SMITH\/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh",
        "above_bar_code_image_url": "https:\/\/www.example.com\/en\/PLAT.png",
        "auxiliary_fields": [{
            "label": "Terminal",
            "value": "T1"
          },
          {
            "label": "Departure",
            "value": "30OCT 19:05"
          }
        ],
        "secondary_fields": [{
            "label": "Boarding",
            "value": "18:30"
          },
          {
            "label": "Gate",
            "value": "D57"
          },
          {
            "label": "Seat",
            "value": "74J"
          },
          {
            "label": "Sec.Nr.",
            "value": "003"
          }
        ],
        "flight_info": {
          "flight_number": "KL0642",
          "departure_airport": {
            "airport_code": "JFK",
            "city": "New York",
            "terminal": "T1",
            "gate": "D57"
          },
          "arrival_airport": {
            "airport_code": "AMS",
            "city": "Amsterdam"
          },
          "flight_schedule": {
            "departure_time": "2016-01-02T19:05",
            "arrival_time": "2016-01-05T17:30"
          }
        }
      }]
    }
  } else if (msg_text === "航空公司報到範本") {
    template["payload"] = {
      "template_type": "airline_checkin",
      "intro_message": "Check-in is available now.",
      "locale": "en_US",
      "pnr_number": "ABCDEF",
      "checkin_url": "https:\/\/www.airline.com\/check-in",
      "flight_info": [{
        "flight_number": "f001",
        "departure_airport": {
          "airport_code": "SFO",
          "city": "San Francisco",
          "terminal": "T4",
          "gate": "G8"
        },
        "arrival_airport": {
          "airport_code": "SEA",
          "city": "Seattle",
          "terminal": "T4",
          "gate": "G8"
        },
        "flight_schedule": {
          "boarding_time": "2016-01-05T15:05",
          "departure_time": "2016-01-05T15:45",
          "arrival_time": "2016-01-05T17:30"
        }
      }]
    }
  } else if (msg_text === "航空公司行程範本") {
    template["payload"] = {
      "template_type": "airline_itinerary",
      "intro_message": "Here is your flight itinerary.",
      "locale": "en_US",
      "pnr_number": "ABCDEF",
      "passenger_info": [{
          "name": "Farbound Smith Jr",
          "ticket_number": "0741234567890",
          "passenger_id": "p001"
        },
        {
          "name": "Nick Jones",
          "ticket_number": "0741234567891",
          "passenger_id": "p002"
        }
      ],
      "flight_info": [{
          "connection_id": "c001",
          "segment_id": "s001",
          "flight_number": "KL9123",
          "aircraft_type": "Boeing 737",
          "departure_airport": {
            "airport_code": "SFO",
            "city": "San Francisco"
          },
          "arrival_airport": {
            "airport_code": "SLC",
            "city": "Salt Lake City"
          },
          "flight_schedule": {
            "departure_time": "2016-01-02T19:45",
            "arrival_time": "2016-01-02T21:20"
          },
          "travel_class": "business"
        },
        {
          "connection_id": "c002",
          "segment_id": "s002",
          "flight_number": "KL321",
          "aircraft_type": "Boeing 747-200",
          "travel_class": "business",
          "departure_airport": {
            "airport_code": "SLC",
            "city": "Salt Lake City",
            "terminal": "T1",
            "gate": "G33"
          },
          "arrival_airport": {
            "airport_code": "AMS",
            "city": "Amsterdam",
            "terminal": "T1",
            "gate": "G33"
          },
          "flight_schedule": {
            "departure_time": "2016-01-02T22:45",
            "arrival_time": "2016-01-03T17:20"
          }
        }
      ],
      "passenger_segment_info": [{
          "segment_id": "s001",
          "passenger_id": "p001",
          "seat": "12A",
          "seat_type": "Business"
        },
        {
          "segment_id": "s001",
          "passenger_id": "p002",
          "seat": "12B",
          "seat_type": "Business"
        },
        {
          "segment_id": "s002",
          "passenger_id": "p001",
          "seat": "73A",
          "seat_type": "World Business",
          "product_info": [{
              "title": "Lounge",
              "value": "Complimentary lounge access"
            },
            {
              "title": "Baggage",
              "value": "1 extra bag 50lbs"
            }
          ]
        },
        {
          "segment_id": "s002",
          "passenger_id": "p002",
          "seat": "73B",
          "seat_type": "World Business",
          "product_info": [{
              "title": "Lounge",
              "value": "Complimentary lounge access"
            },
            {
              "title": "Baggage",
              "value": "1 extra bag 50lbs"
            }
          ]
        }
      ],
      "price_info": [{
        "title": "Fuel surcharge",
        "amount": "1597",
        "currency": "USD"
      }],
      "base_price": "12206",
      "tax": "200",
      "total_price": "14003",
      "currency": "USD"
    }
  } else if (msg_text === "航空公司更新範本") {
    template["payload"] = {
      "template_type": "airline_update",
      "intro_message": "Your flight is delayed",
      "update_type": "delay",
      "locale": "en_US",
      "pnr_number": "CF23G2",
      "update_flight_info": {
        "flight_number": "KL123",
        "departure_airport": {
          "airport_code": "SFO",
          "city": "San Francisco",
          "terminal": "T4",
          "gate": "G8"
        },
        "arrival_airport": {
          "airport_code": "AMS",
          "city": "Amsterdam",
          "terminal": "T4",
          "gate": "G8"
        },
        "flight_schedule": {
          "boarding_time": "2015-12-26T10:30",
          "departure_time": "2015-12-26T11:30",
          "arrival_time": "2015-12-27T07:30"
        }
      }
    }
  }


  if (typeof template['payload'] !== 'undefined') {
    respons_message["attachment"] = template;
  } else {
    respons_message["text"] = "這個還沒有實作!!!";
    respons_message["quick_replies"] = [{
        "content_type": "text",
        "title": "看地圖",
        "payload": "看地圖",
        "image_url": "https://lorempixel.com/400/200/food/"
      },
      {
        "content_type": "text",
        "title": "看訊息範本",
        "payload": "template",
        "image_url": "https://lorempixel.com/400/200/food/"
      },
      {
        "content_type": "text",
        "title": "看按鈕",
        "payload": "Buttons",
        "image_url": "https://lorempixel.com/400/200/food/"
      }
    ]
  }
  return respons_message
}
