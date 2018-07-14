const callSendAPI = require('../senderAction')
// Handles messages events
module.exports = function handleMessage(page_id, sender_psid, received_message) {
    let respons_message = {};

    console.log('handleMessage: ', received_message.text);

    // Check if the message contains text
    if(received_message.text) {


        const msg_text = received_message.text;
        if((/看地圖|找地點|在哪|在哪裡/ig).test(msg_text)) {
            console.log('quick location');

            respons_message["text"] = `在地圖指一下你在哪`
            respons_message["quick_replies"] = [{
                "content_type": "location"
            }]
        }
        else if((/看訊息範本/ig).test(msg_text)) {
            respons_message["text"] = '你想要看哪一種訊息範本？'

            // quick_replies
            respons_message["quick_replies"] = [{
                    "content_type": "text",
                    "title": "一般型範本",
                    "payload": "Generic template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "清單範本",
                    "payload": "List template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "按鈕範本",
                    "payload": "Button template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "開放社交關係圖範本",
                    "payload": "Open Graph template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "收據範本",
                    "payload": "Receipt template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "航空公司登機證範本",
                    "payload": "Airline templates",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "航空公司報到範本",
                    "payload": "Airline templates",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "航空公司行程範本",
                    "payload": "Airline templates",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "航空公司更新範本",
                    "payload": "Airline templates",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "媒體範本",
                    "payload": "Media template",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                }
            ]
        }
        else if((/一般型範本|清單範本|按鈕範本|開放社交關係圖範本|媒體範本|收據範本|航空公司登機證範本|航空公司報到範本|航空公司行程範本|航空公司更新範本/ig).test(msg_text)) {
            let template = {
                "type": "template"
            };
            respons_message["attachment"] = template;

            if(msg_text === "一般型範本") {
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
            }
            else if(msg_text === "清單範本") {
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
            }
            else if(msg_text === "按鈕範本") {
                template["payload"] = {
                    "template_type": "button",
                    "text": "你想用哪種搜尋引擎?",
                    "buttons": [{
                            "type": "web_url",
                            "url": "https://www.google.com",
                            "title": "Goodle"
                        },
                        {
                            "type": "web_url",
                            "url": "https://www.yahoo.com",
                            "title": "Yahoo!"
                        }
                    ]
                }
            }
            else if(msg_text === "開放社交關係圖範本") {

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
            }
            else if(msg_text === "媒體範本") {
                const mediaElement = {
                    "media_type": "image",
                    // "url": "<FACEBOOK_URL>"
                    "url": "https://www.facebook.com/photo.php?fbid=2653420547347&set=a.1486469894310.70355.1610812382&type=3&theater"
                };

                template["payload"] = {
                    "template_type": "media",
                    "elements": [
                        mediaTemplate
                    ]
                }
            }
            else if(msg_text === "收據範本") {
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
            }
            else if(msg_text === "航空公司登機證範本") {
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
            }
            else if(msg_text === "航空公司報到範本") {
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
            }
            else if(msg_text === "航空公司行程範本") {
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
            }
            else if(msg_text === "航空公司更新範本") {
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
            else {
                respons_message["text"] = "這個還沒有實作!!!";
                delete respons_message.attachment;
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
        }
        else if((/看按鈕/ig).test(msg_text)) {
            respons_message["text"] = '你想要看哪一種按鈕？'

            // quick_replies
            respons_message["quick_replies"] = [{
                    "content_type": "text",
                    "title": "網址按鈕",
                    "payload": "URL Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "回傳按鈕",
                    "payload": "Postback Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "分享按鈕",
                    "payload": "Share Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "購買按鈕",
                    "payload": "Buy Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "通話按鈕",
                    "payload": "Call Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "登入按鈕",
                    "payload": "Log In Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "登出按鈕",
                    "payload": "Log Out Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "玩遊戲按鈕",
                    "payload": "Game Play Button",
                    // "image_url": "https://lorempixel.com/400/200/food/"
                }
            ]
        }
        else if((/網址按鈕|回傳按鈕|分享按鈕|購買按鈕|通話按鈕|登入按鈕|登出按鈕|玩遊戲按鈕/ig).test(msg_text)) {
            let template = {
                "type": "template"
            };
            respons_message["attachment"] = template;

            if(msg_text === "網址按鈕") {
                const urlButtonGoogle = {
                    "type": "web_url",
                    "url": "https://www.google.com",
                    "title": "Goodle(full)",
                    "webview_height_ratio": "full"
                }

                const urlButtonYahoo = {
                    "type": "web_url",
                    "url": "https://www.yahoo.com",
                    "title": "Yahoo!(compact)",
                    "webview_height_ratio": "compact"
                }

                const urlButtonBing = {
                    "type": "web_url",
                    "url": "https://www.bing.com",
                    "title": "Bing(tall)",
                    "webview_height_ratio": "tall"
                }

                template["payload"] = {
                    "template_type": "button",
                    "text": "網址按鈕!!",
                    "buttons": [
                        urlButtonGoogle,
                        urlButtonBing,
                        urlButtonYahoo
                    ]
                }
            }
            else if(msg_text === "回傳按鈕") {
                const payloadButton = {
                    "type": "postback",
                    "title": "回傳按鈕1",
                    "payload": "PAYLOAD_STRING"
                }
                template["payload"] = {
                    "template_type": "button",
                    "text": "回傳按鈕!!",
                    "buttons": [
                        payloadButton,
                        payloadButton,
                        payloadButton
                    ]
                }
            }
            else if(msg_text === "分享按鈕") {
                const share = {
                    "type": "element_share"
                }
                template["payload"] = {
                    "template_type": "generic",
                    "elements": [{
                        "title": "這是?",
                        "subtitle": "你覺得？",
                        "image_url": "https://lorempixel.com/800/800/food/",
                        "buttons": [
                            share
                        ],
                    }]
                }
            }
            // else if (msg_text === "購買按鈕") {
            // }
            else if(msg_text === "通話按鈕") {
                const phoneNumberButton = {
                    "type": "phone_number",
                    "title": "聖凱的手機",
                    "payload": "0921026229"
                }
                template["payload"] = {
                    "template_type": "button",
                    "text": "通話按鈕(小心使用)",
                    "buttons": [
                        phoneNumberButton,
                        phoneNumberButton,
                        phoneNumberButton
                    ]
                }
            }

            // else if (msg_text === "登入按鈕") {
            // }
            // else if (msg_text === "登出按鈕") {
            // }
            // else if (msg_text === "玩遊戲按鈕") {
            // }
            else {
                respons_message["text"] = "這個還沒有實作!!!";
                delete respons_message.attachment;
            }

            // respons_message["quick_replies"] = [{
            //         "content_type": "text",
            //         "title": "看地圖",
            //         "payload": "看地圖",
            //         "image_url": "https://lorempixel.com/400/200/food/"
            //     },
            //     {
            //         "content_type": "text",
            //         "title": "看訊息範本",
            //         "payload": "template",
            //         "image_url": "https://lorempixel.com/400/200/food/"
            //     },
            //     {
            //         "content_type": "text",
            //         "title": "看按鈕",
            //         "payload": "Buttons",
            //         "image_url": "https://lorempixel.com/400/200/food/"
            //     }
            // ]
        }
        else {
            respons_message["text"] = `回音: "${msg_text}"...`
            // quick_replies
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
    }
    else if(received_message.attachments) {
        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        respons_message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [{
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    console.log('-----------------');
    console.log(JSON.stringify(respons_message));
    console.log('-----------------');

    // Sends the response message
    callSendAPI(page_id, sender_psid, respons_message);
}
