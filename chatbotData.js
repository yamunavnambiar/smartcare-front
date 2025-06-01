const chatbotData = [
  
  // 1
  {
    question: "How often have you been feeling down, depressed, or hopeless lately?",
    options: [
      "Almost every day",
      "A few times a week",
      "Rarely",
      "Not at all"
    ],
    comfort: {
      "Almost every day": {
        message: "It’s really hard to feel that way so often. Remember, it’s okay to ask for help and you don’t have to face this alone. Small steps can lead to brighter days. 💜",
        video: "https://www.youtube.com/embed/92i1ssLnk3k"
      },
      "A few times a week": {
        message: "Feeling low sometimes is part of being human. Try to acknowledge your emotions and know they won’t last forever. You’re stronger than you think. 💪"
      },
      "Rarely": {
        message: "That’s a positive sign. Keep checking in with yourself and nurture those good moments."
      },
      "Not at all": {
        message: "That’s wonderful! Keep up whatever is working for you and remember to care for your mental health regularly."
      }
    }
  },
  // 2
  {
    question: "Do you find little interest or pleasure in doing things you used to enjoy?",
    options: [
      "Yes, almost all the time",
      "Occasionally",
      "No, I still enjoy most things"
    ],
    comfort: {
      "Yes, almost all the time": {
        message: "Loss of interest can be a sign your mind is under a lot of stress. Be gentle with yourself and try small activities, even if it’s just a walk or listening to music. Healing takes time. 💜",
        video: "https://www.youtube.com/embed/GmXkhq2bzZ4"
      },
      "Occasionally": {
        message: "It’s normal to have ups and downs in motivation. Celebrate the moments you do enjoy and be kind during the tougher ones."
      },
      "No, I still enjoy most things": {
        message: "That’s a good sign of mental wellness. Keep nourishing the things that bring you joy."
      }
    }
  },
  // 3
  {
    question: "Have you been struggling to find motivation to complete daily tasks?",
    options: [
      "Yes, even simple things feel exhausting",
      "Sometimes",
      "No, I manage okay"
    ],
    comfort: {
      "Yes, even simple things feel exhausting": {
        message: "That can be very overwhelming. It’s okay to take breaks and focus on self-care. You’re doing your best, and that’s enough. Reach out if you need support. 💜"
      },
      "Sometimes": {
        message: "Some days are harder than others. Try to focus on small wins and be patient with yourself."
      },
      "No, I manage okay": {
        message: "That’s great! Keep maintaining healthy habits to sustain your motivation."
      }
    }
  },
  // 4
  {
    question: "Do you often feel like a burden to others?",
    options: [
      "Yes, very often",
      "Occasionally",
      "No, not really"
    ],
    comfort: {
      "Yes, very often": {
        message: "You are not a burden. Everyone needs support sometimes, and those who care about you want to help. You are valuable just as you are. 💜"
      },
      "Occasionally": {
        message: "Feeling like a burden occasionally is common, but it’s important to remind yourself that your feelings and needs matter."
      },
      "No, not really": {
        message: "That’s wonderful to hear. Keep nurturing your self-worth and relationships."
      }
    }
  },
  // 5
  {
    question: "How often do you feel nervous, anxious, or on edge?",
    options: [
      "Most of the day",
      "A few times a week",
      "Rarely",
      "Almost never"
    ],
    comfort: {
      "Most of the day": {
        message: "Constant anxiety can be exhausting. Remember to breathe deeply and try grounding techniques when you feel overwhelmed. You’re not alone in this. 💜",
        video: "https://www.youtube.com/embed/inpok4MKVLM"
      },
      "A few times a week": {
        message: "Anxiety can come and go. When it hits, try to acknowledge it without judgment and remind yourself that it will pass."
      },
      "Rarely": {
        message: "That’s positive. Keep maintaining balance in your life to keep anxiety low."
      },
      "Almost never": {
        message: "Fantastic! You seem to be managing well."
      }
    }
  },
  // 6
  {
    question: "Do you find it difficult to control your worries or thoughts?",
    options: [
      "Yes, they spiral quickly",
      "Sometimes",
      "No, I can usually manage"
    ],
    comfort: {
      "Yes, they spiral quickly": {
        message: "Worries can sometimes feel overwhelming. Try redirecting your focus to the present moment and remember that thoughts are not facts. You’re taking the right steps by sharing this here. 💙"
      },
      "Sometimes": {
        message: "Managing your worries takes practice. Celebrate your successes and be patient on tougher days."
      },
      "No, I can usually manage": {
        message: "Good job managing your thoughts. Keep practicing mindfulness and self-compassion."
      }
    }
  },
  // 7
  {
    question: "Do you experience physical symptoms when anxious (e.g., racing heart, sweating, stomach discomfort)?",
    options: [
      "Often",
      "Occasionally",
      "Rarely",
      "Never"
    ],
    comfort: {
      "Often": {
        message: "Physical symptoms of anxiety can feel scary but they’re your body's natural response. Try slow breathing and remind yourself you’re safe right now. You’re not alone. 💜"
      },
      "Occasionally": {
        message: "Recognizing these signs is a good step. Try to relax your body when you notice them."
      },
      "Rarely": {
        message: "It’s great that symptoms are infrequent. Keep up healthy habits."
      },
      "Never": {
        message: "Wonderful! It’s great to hear your body feels calm."
      }
    }
  },
  // 8
  {
    question: "Do you worry excessively about things you can't control?",
    options: [
      "Yes, very often",
      "Sometimes",
      "No, not really"
    ],
    comfort: {
      "Yes, very often": {
        message: "Worrying about uncontrollable things is exhausting. Try focusing on what you can control and practice self-kindness. You’re doing your best, and that’s enough. 💜"
      },
      "Sometimes": {
        message: "It’s natural to worry sometimes. Mindful acceptance can help ease this."
      },
      "No, not really": {
        message: "That’s a healthy mindset. Keep nurturing this perspective."
      }
    }
  },
  // 9
  {
    question: "How well are you sleeping these days?",
    options: [
      "I struggle to fall asleep",
      "I wake up multiple times at night",
      "I oversleep but still feel tired",
      "I sleep well"
    ],
    comfort: {
      "I struggle to fall asleep": {
        message: "Trouble falling asleep is tough. Try establishing a relaxing bedtime routine and limit screens before sleep. You deserve rest. 💤",
        video: "https://www.youtube.com/embed/z6X5oEIg6Ak"
      },
      "I wake up multiple times at night": {
        message: "Interrupted sleep affects your whole day. Try calming your mind before bed and consider journaling your worries to ease your thoughts."
      },
      "I oversleep but still feel tired": {
        message: "Oversleeping yet feeling tired can be frustrating. It might help to keep a regular wake time and get fresh air during the day."
      },
      "I sleep well": {
        message: "Great! Good sleep is a foundation for mental well-being. Keep up the good habits."
      }
    }
  },
  // 10
  {
    question: "Do you often wake up feeling unrefreshed or tired?",
    options: [
      "Yes, almost every day",
      "Occasionally",
      "No, I feel okay in the morning"
    ],
    comfort: {
      "Yes, almost every day": {
        message: "Waking up tired can affect your mood and energy. Try small changes in your sleep environment and routines to support better rest. You deserve to feel refreshed. 💜"
      },
      "Occasionally": {
        message: "Sometimes it happens. Take it as a cue to rest when possible and care for yourself."
      },
      "No, I feel okay in the morning": {
        message: "Fantastic! Starting the day refreshed is important for your mental health."
      }
    }
  },
  // 11
  {
    question: "How frequently do you feel overwhelmed by responsibilities?",
    options: [
      "Daily",
      "A few times a week",
      "Rarely",
      "Almost never"
    ],
    comfort: {
      "Daily": {
        message: "Feeling overwhelmed daily can lead to burnout. It’s okay to set boundaries and ask for help. Your well-being is important. 💙",
        video: "https://www.youtube.com/embed/hnpQrMqDoqE"
      },
      "A few times a week": {
        message: "Stress is part of life, but managing it can make a difference. Try to take breaks and prioritize what truly matters."
      },
      "Rarely": {
        message: "That’s encouraging. Keep balancing your responsibilities with self-care."
      },
      "Almost never": {
        message: "Awesome! It seems you’ve found a good rhythm."
      }
    }
  },
  // 12
  {
    question: "Have you felt emotionally numb or detached lately?",
    options: [
      "Yes, I feel disconnected from everything",
      "Sometimes",
      "No, I feel emotionally present"
    ],
    comfort: {
      "Yes, I feel disconnected from everything": {
        message: "Emotional numbness is often a protective response to stress or pain. It’s okay to feel this way, and reaching out for connection can help. 💜"
      },
      "Sometimes": {
        message: "Feeling numb sometimes can be confusing. Try grounding exercises to reconnect with your feelings."
      },
      "No, I feel emotionally present": {
        message: "Good to hear you feel present. Maintaining emotional connection is vital."
      }
    }
  },
  // 13
  {
    question: "Do you often feel like you're running on empty, even after rest?",
    options: [
      "Yes, constantly exhausted",
      "Occasionally",
      "Not really"
    ],
    comfort: {
      "Yes, constantly exhausted": {
        message: "Chronic exhaustion is tough. Your body and mind might be telling you they need more care. Small rest moments and reaching out for support can help. 💜"
      },
      "Occasionally": {
        message: "Sometimes it happens. Take breaks when you can and be kind to yourself."
      },
      "Not really": {
        message: "That’s a positive sign. Keep listening to your needs."
      }
    }
  },
  // 14
  {
    question: "Have you experienced sudden mood swings recently?",
    options: [
      "Yes, frequently",
      "Sometimes",
      "No"
    ],
    comfort: {
      "Yes, frequently": {
        message: "Mood swings can be unsettling. Remember, it’s okay to feel a range of emotions. Sharing with someone you trust can help you feel supported. 💜"
      },
      "Sometimes": {
        message: "Some variability is normal. Try journaling your feelings to track patterns."
      },
      "No": {
        message: "Great! Stable moods help keep you balanced."
      }
    }
  },
  // 15
  {
    question: "Do you feel isolated or lonely often?",
    options: [
      "Yes, very often",
      "Sometimes",
      "No"
    ],
    comfort: {
      "Yes, very often": {
        message: "Feeling lonely can be very painful. You are not alone in this feeling. Try reaching out to friends, family, or support groups. Your feelings matter deeply. 💜",
        video: "https://www.youtube.com/embed/3pqom0cnbMQ"
      },
      "Sometimes": {
        message: "Loneliness comes and goes. Remember to nurture your connections, even small interactions can help."
      },
      "No": {
        message: "Wonderful! Connections are essential for well-being."
      }
    }
  },
  // 16
  {
    question: "Have you had thoughts of harming yourself or suicide?",
    options: [
      "Yes, recently",
      "Sometimes",
      "No"
    ],
    comfort: {
      "Yes, recently": {
        message: "I’m really sorry you’re feeling this way. You are not alone, and there is help available. Please reach out to a trusted person or professional. Your life is precious. 💙",
        video: "https://www.youtube.com/embed/3k5D7VZkquc"
      },
      "Sometimes": {
        message: "These thoughts are serious. Please consider talking to someone you trust or a mental health professional. You deserve support and care."
      },
      "No": {
        message: "That’s a relief. If you ever feel this way, remember help is always available."
      }
    }
  },
  // 17
  {
    question: "Do you find it difficult to concentrate or make decisions?",
    options: [
      "Yes, very difficult",
      "Sometimes",
      "No"
    ],
    comfort: {
      "Yes, very difficult": {
        message: "Difficulty concentrating can be frustrating. Try breaking tasks into small steps and give yourself permission to rest when needed. You’re doing your best. 💜"
      },
      "Sometimes": {
        message: "It’s normal to have trouble focusing occasionally. Take breaks and be gentle with yourself."
      },
      "No": {
        message: "Great! Your focus helps you manage daily tasks well."
      }
    }
  },
  // 18
  {
    question: "How often do you feel fatigued without physical exertion?",
    options: [
      "Almost every day",
      "A few times a week",
      "Rarely",
      "Never"
    ],
    comfort: {
      "Almost every day": {
        message: "Fatigue can be draining. Your body might be signaling a need for rest or professional care. You’re not alone and help is available. 💜"
      },
      "A few times a week": {
        message: "Occasional fatigue can be normal but listen to your body and take breaks."
      },
      "Rarely": {
        message: "Good that fatigue is uncommon for you. Keep caring for yourself."
      },
      "Never": {
        message: "Wonderful energy levels! Keep nourishing your well-being."
      }
    }
  },
  // 19
  {
    question: "Do you avoid social situations because of anxiety or fear?",
    options: [
      "Yes, often",
      "Sometimes",
      "No"
    ],
    comfort: {
      "Yes, often": {
        message: "Social anxiety can feel isolating. You are not alone in this. Taking small steps and practicing self-compassion can help you gradually reconnect. 💜"
      },
      "Sometimes": {
        message: "It’s okay to feel hesitant sometimes. Celebrate your courage when you do engage socially."
      },
      "No": {
        message: "That’s great! Social connections can be a strong source of support."
      }
    }
  },
  // 20
  {
    question: "Are you currently taking any medication or therapy for your mental health?",
    options: [
      "Yes",
      "No",
      "Considering it"
    ],
    comfort: {
      "Yes": {
        message: "Taking care of your mental health with professional help is brave. Keep following your treatment and reach out when you need support. 💙"
      },
      "No": {
        message: "It’s okay if you’re not currently on treatment. If you feel the need, professional help is always available and can make a difference."
      },
      "Considering it": {
        message: "Thinking about getting help is a strong and positive step. Take your time and know that support is ready when you are."
      }
    }
  },
  // 21
  {
    question: "Do you feel hopeful about the future?",
    options: [
      "Yes, mostly",
      "Sometimes",
      "No, not really"
    ],
    comfort: {
      "Yes, mostly": {
        message: "Hope is a powerful healer. Keep nurturing it and take things one day at a time. You’ve got this. 💜"
      },
      "Sometimes": {
        message: "Hope can ebb and flow. It’s okay to have ups and downs. Keep reaching for the light."
      },
      "No, not really": {
        message: "It’s okay to feel this way. You’re not alone, and there is help and hope even if it feels distant right now."
      }
    }
  },
  
];

export default chatbotData;