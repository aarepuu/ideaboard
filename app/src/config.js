/* eslint-disable comma-dangle */
/* eslint-disable quotes */
export default {
  domain: process.env.DEPLOYMENT,
  driftkey: "msffsx6pi5gb",
  cdn1: `https://cdn.${process.env.DEPLOYMENT}`,
  cdn2: `https://cdn2.${process.env.DEPLOYMENT}`,
  content: `${process.env.CONTENT}`,
  gtag: `${process.env.GTAG}`,
  // TODO: Google UA END of life - https://support.google.com/analytics/answer/11583528?hl=en
  instances: {
    default: "ctb",
    master: {
      color: "#0099D0",
    },
    citylit: {
      color: "#7e179f",
      subdomain: "citylit",
    },
    wea: {
      color: "#006172",
      subdomain: "wea",
    },
    ncl: {
      color: "#003865",
      subdomain: "ncl",
    },
    openlab: {
      color: "#0099D0",
      subdomain: "openlab",
    },
    ctb: {
      color: "#00AAB2",
      logoColor: "#ffff",
      logoTitle: "Community Toolbox",
      outcome: {
        ideaDocument: { title: "Idea submission" },
        followIdea: { title: "Start follow on Idea" },
      },
      createIdea: {
        title: "Create a challenge",
        subtitle: 'This is where it begins, start an Challenge, invite your community and begin having the discussion!',
        inputFields: {
          title: {
            name: "Title",
            placeholder: "Give your challenge a title",
          },
          tagline: {
            name: "Tagline",
            placeholder: "A snappy one-liner about your challenge",
          },
          description: {
            name: "Background",
            placeholder: "Describe your challenge in more detail",
          },
        },
      },
    },
    myto: {
      color: "#0B9BD0",
      subdomain: "myto",
    },
    wingrove: {
      color: "#096c90",
      subdomain: "wingrove",
    },
    purdueux: {
      color: "#D6AE58",
      subdomain: "purdueux",
    },
    healthchecks: {
      color: "#1f3369",
      subdomain: "healthchecks",
    },
    cell: {
      color: "#0099D0",
      subdomain: "cell",
    },
    demvr: {
      color: "#fff",
      subdomain: "cell",
      logoColor: "#363636",
    },
    involvenottshc: {
      color: "#fff",
      subdomain: "cell",
      logoColor: "#363636",
      logoTitle: "InvolveNottsHC",
    },
    comtech: {
      color: "#000000",
      subdomain: "cell",
      logoTitle: "C&T",
      outcome: {
        ideaDocument: { title: "Workshop Submission" },
        followIdea: { title: "Start follow on Idea", hide: true },
      },
      createIdea: {
        title: "Propose a new workshop",
        subtitle: "",
        inputFields: {
          title: {
            name: "Topic",
            placeholder: "State your workshop topic / theme",
          },
          tagline: {
            name: "Tagline",
            placeholder: "A snappy one-liner about your proposal",
          },
          description: {
            name: "Description",
            placeholder: "Describe your workshop proposal in more detail",
          },
        },
      },
    },
  },
  // eslint-disable-next-line semi
};
