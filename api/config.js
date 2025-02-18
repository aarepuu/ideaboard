module.exports = {
  domain: process.env.DEPLOYMENT,
  instances: {
    default: "ctb",
    // main: {
    // },
    // citylit: {
    //   subdomain: "citylit",
    // },
    // wea: {
    //   subdomain: "wea",
    // },
    // ncl: {
    //   subdomain: "ncl",
    // },
    // openlab: {
    //   subdomain: "openlab",
    // },
    ctb: {
      // subdomain: "ideaboard",
      admin: {
        name: "Community Tool Box Admin",
        bio: "Admin of this site. Please get in touch if you have any issues.",
        email: "sensemystreet@gmail.com",
      },
      categories: [
        { tag: "proposal", name: "Proposal for monitoring" },
        { tag: "showcase", name: "Showcasing community work" },
        { tag: "idea", name: "General idea" },
        { tag: "challenge", name: "Community challenge" },
        { tag: "other", name: "Other" },
      ],
      tasks: [
        // {
        //   type: "poll",
        //   title: "Deployment dates",
        //   description:
        //     "Propose the best time for the deployment. Maximum time for the loan is one month at a time. Also check the deployment calendar at https://sensemystreet.co.uk/calendar",
        // }, 
        // {
        //   type: "whiteboard",
        //   title: "Locations",
        //   description:
        //     "Use the whiteboard to indicate desired locations for the deployment (e.g. lamp post near school).",
        // },        
        {
          type: "media",
          title: "Additional information",
          description:
            "Upload any additional media you think would be useful for the discussion.",
        },
        {
          type: "data",
          title: "Data Upload",
          description:
            "Upload any data that you think would be useful for the discussion.",
        },
        // {
        //   type: "richtext",
        //   title: "Desire for data",
        //   description: "Please give some idea what use would you have for this data. Where and how are you planning to use it?",
        // },
        {
          type: "discussion",
          title: "Discussion",
          description:
            "Discuss your experiences of using the tool.",
        },
        {
          type: "map",
          title: "Map Locations",
          description:
            "Identify an issue in this location.",
        }
      ]
    },
    // myto: {
    //   subdomain: "myto",
    //   admin: {
    //     name: "Myto Admin",
    //     bio: "Admin of this site. Please get in touch if you have any issues.",
    //     email: "myto@edjenkins.co.uk",
    //   },
    //   document:
    //     "<h1>Idea title here...</h1><br /><p>Idea description here...</p>",
    //   categories: [
    //     { tag: "newcastle", name: "Newcastle, England" },
    //     { tag: "netherlands", name: "Lunteren, Netherlands" },
    //     { tag: "rome", name: "Rome, Italy" },
    //     { tag: "other", name: "Other" },
    //   ],
    //   tasks: [
    //     {
    //       type: "webcam",
    //       title: "Video of your group chat",
    //       description:
    //         "Record a short 5 minute video clip of your group having a chat about your idea.",
    //     },
    //     {
    //       type: "discussion",
    //       title: "Other ideas",
    //       description:
    //         "Share the ideas that were discussed that helped your group to reach the current idea.",
    //     },
    //     {
    //       type: "poll",
    //       title: "Who will your user/audience be?",
    //       description:
    //         "Make a note of who will be the audience for your idea. This might be a group of people or a specific demographic.",
    //     },
    //     {
    //       type: "discussion",
    //       title: "What backs up your idea?",
    //       description:
    //         "Can you provide links or evidence that backs up the idea?",
    //     },
    //     {
    //       type: "poll",
    //       title: "What risks are inherent to your idea?",
    //       description:
    //         "Ideas can face many challenges, discuss some of the issues you might face brining your idea to life.",
    //     },
    //     {
    //       type: "discussion",
    //       title: "Pose a question to the experts!",
    //       description:
    //         "Experts are available to answer some questions you might have about your idea. Please ask them below.",
    //     },
    //   ],
    // },
    // wingrove: {
    //   subdomain: "wingrove",
    // },
    // purdueux: {
    //   subdomain: "purdueux",
    //   admin: {
    //     name: "PurdueUX Admin",
    //     bio: "Admin of this site. Please get in touch if you have any issues.",
    //     email: "dalya.ali@newcastle.ac.uk",
    //   },
    // },
    // healthchecks: {
    //   subdomain: "healthcheaks",
    //   admin: {
    //     name: "Health Checks Admin",
    //     bio: "Admin of this site. Please get in touch if you have any issues.",
    //     email: "dalya.ali@newcastle.ac.uk",
    //   },
    // },
    // cell: {
    //   subdomain: "cell",
    // },
    // demvr: {
    //   subdomain: "demvr",
    //   admin: {
    //     name: "James Hodge",
    //     bio: "",
    //     email: "j.hodge1@ncl.ac.uk",
    //   },
    //   tasks: [
    //     {
    //       type: "richtext",
    //       title: "Twitter Summary",
    //       description: "Lets create a twitter summary of this idea.",
    //     },
    //     {
    //       type: "discussion",
    //       title: "General Discussion",
    //       description: "Talk about anything relating to the proposed idea.",
    //     },
    //     {
    //       type: "poll",
    //       title: "Related Work",
    //       description: "References to prior works and related activities.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Additional Resources Needed",
    //       description:
    //         "Space to think about the types of resources needed for this idea.",
    //     },
    //   ],
    // },
    // comtech: {
    //   subdomain: "comtech",
    //   admin: {
    //     name: "Kyle Montague",
    //     bio: "Admin of this site. Please get in touch if you have any issues.",
    //     email: "kyle.montague@ncl.ac.uk",
    //   },
    //   tasks: [
    //     {
    //       type: "poll",
    //       title: "References & Related Work",
    //       description:
    //         "Remember to include references to prior works and related activities.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Public Description",
    //       description:
    //         "Develop a 200-word description that will be posted on the conference site to recruit participants for your workshop.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Call for Participation",
    //       description:
    //         "You will need to develop a short Call for Participation for your workshop. Are you going to ask your participants to write position papers or statement of interest?",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Additional Resources Needed",
    //       description:
    //         "Space to think about the types of resources you will need to run the workshop.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Organisers",
    //       description:
    //         "Provide short biographical descriptions of the workshop organisers.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Post-Workshop Plans",
    //       description:
    //         "State your plans for follow-up and creation of tangible outcomes and goals.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Schedule",
    //       description:
    //         "Explain in detail the workshop structure, including activities, timing, and resources.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Pre-Workshop Plans",
    //       description:
    //         "State your plans for recruiting workshop participants and community-building ahead of the planned workshop.",
    //     },
    //     {
    //       type: "richtext",
    //       title: "Workshop Activities",
    //       description:
    //         "Formulate ideas for possible activities to run on the day and issues to be addressed.",
    //     },
    //     {
    //       type: "discussion",
    //       title: "General Discussion",
    //       description: "Talk about anything relating to the proposed workshop.",
    //     },
    //   ],
    // },
    // involvenottshc: {
    //   subdomain: "involvenottshc",
    //   tasks: [
    //     {
    //       type: "discussion",
    //       title: "General Discussion",
    //       description: "Talk about anything relating to the proposed workshop.",
    //     },
    //   ],
    // },
  },
};
