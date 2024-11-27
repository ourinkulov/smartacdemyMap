import { useEffect } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    TL: any;
    timeline: any;
  }
}

const Timeline = () => {
  const { t, i18n } = useTranslation<string>();
  const baseUrl = `${window.location.protocol}//${window.location.host}/assets/timeline`;
  const timelineData = {
    title: {
      text: {
        headline:
          i18n.language.toString() == "En" || i18n.language == "Ru"
            ? t("academys").toUpperCase() + " " + t("iiv").toUpperCase()
            : t("iiv").toUpperCase() + " " + t("academys").toUpperCase(),
        text: t("timeline.title"),
      },
    },
    events: [
      {
        media: {
          url: `${baseUrl}/slide1.jpg`,
        },
        start_date: {
          year: "2021",
          month: "4",
          day: "15",
        },
        text: {
          headline: t("timeline.firstslide.title"),
          text: t("timeline.firstslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide2.jpg`,
        },
        start_date: {
          year: "2021",
          month: "6",
          day: "3",
        },
        end_date: {
          year: "2021",
          month: "7",
          day: "8",
        },
        text: {
          headline: t("timeline.secondslide.title"),
          text: t("timeline.secondslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide3.jpg`,
        },
        start_date: {
          year: "2022",
          month: "2",
          day: "23",
        },
        text: {
          headline: t("timeline.thirdslide.title"),
          text: t("timeline.thirdslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide4.jpg`,
        },
        start_date: {
          year: "2022",
          month: "8",
          day: "15",
        },
        text: {
          headline: t("timeline.fourthslide.title"),
          text: t("timeline.fourthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide5.jpg`,
        },
        start_date: {
          year: "2021",
          month: "8",
          day: "11",
        },
        text: {
          headline: t("timeline.fifthslide.title"),
          text: t("timeline.fifthslide.text"),
        },
      },
      {
        media: {
          url: ``,
        },
        start_date: {
          year: "2021",
          month: "11",
          day: "26",
        },
        text: {
          headline: t("timeline.sixthslide.title"),
          text: t("timeline.sixthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide7.jpg`,
        },
        start_date: {
          year: "2022",
          month: "2",
          day: "7",
        },
        text: {
          headline: t("timeline.seventhslide.title"),
          text: t("timeline.seventhslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide8.jpg`,
        },
        start_date: {
          year: "2022",
          month: "4",
          day: "12",
        },
        text: {
          headline: t("timeline.eighthslide.title"),
          text: t("timeline.eighthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide9.jpg`,
        },
        start_date: {
          year: "2022",
          month: "5",
          day: "29",
        },
        text: {
          headline: t("timeline.ninethslide.title"),
          text: t("timeline.ninethslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide10.jpg`,
        },
        start_date: {
          year: "2022",
          month: "11",
          day: "3",
        },
        text: {
          headline: t("timeline.tenthslide.title"),
          text: t("timeline.tenthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide11.jpg`,
        },
        start_date: {
          year: "2023",
          month: "1",
          day: "18",
        },
        text: {
          headline: t("timeline.eleventhslide.title"),
          text: t("timeline.eleventhslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide12.jpg`,
        },
        start_date: {
          year: "2023",
          month: "3",
          day: "4",
        },
        text: {
          headline: t("timeline.twelfthslide.title"),
          text: t("timeline.twelfthslide.text"),
        },
      },
      {
        media: {
          url: ``,
        },
        start_date: {
          year: "2023",
          month: "8",
          day: "18",
        },
        text: {
          headline: t("timeline.thirteenthslide.title"),
          text: t("timeline.thirteenthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide14.jpg`,
        },
        start_date: {
          year: "2023",
          month: "11",
          day: "30",
        },
        text: {
          headline: t("timeline.fourteenthslide.title"),
          text: t("timeline.fourteenthslide.text"),
        },
      },
      {
        media: {
          url: ``,
        },
        start_date: {
          year: "2024",
          month: "1",
          day: "16",
        },
        text: {
          headline: t("timeline.fifteenthslide.title"),
          text: t("timeline.fifteenthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide16.jpg`,
        },
        start_date: {
          year: "2024",
          month: "2",
          day: "24",
        },
        text: {
          headline: t("timeline.sixteenthslide.title"),
          text: t("timeline.sixteenthslide.text"),
        },
      },
      {
        media: {
          url: ``,
        },
        start_date: {
          year: "2024",
          month: "4",
          day: "2",
        },
        text: {
          headline: t("timeline.seventeenthslide.title"),
          text: t("timeline.seventeenthslide.text"),
        },
      },
      {
        media: {
          url: `${baseUrl}/slide18.jpg`,
        },
        start_date: {
          year: "2024",
          month: "6",
          day: "22",
        },
        text: {
          headline: t("timeline.eighteenthslide.title"),
          text: t("timeline.eighteenthslide.text"),
        },
      },
      {
        media: {
          url: ``,
        },
        start_date: {
          year: "2024",
          month: "7",
          day: "7",
        },
        text: {
          headline: t("timeline.nineteenthslide.title"),
          text: t("timeline.nineteenthslide.text"),
        },
      },
    ],
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${window.location.protocol}//${window.location.host}/assets/timeline/timeline.css`;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =`${window.location.protocol}//${window.location.host}/assets/timeline/timeline.js`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.timeline = new window.TL.Timeline("timeline-embed", timelineData, {
        language: i18n.language.toString() == "Ru" ? "ru" : "en",
        fontFamily: "Montserrat",
      });
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [timelineData, i18n.language]);

  return (
    <div className="p-6 w-full h-[calc(100%-65px)]">
      {/* <h1 className="timeline-title text-center  text-4xl font-semibold mb-2">
        {t("academy timeline")}
      </h1> */}
      <div id="timeline-embed" className="rounded-lg"></div>
    </div>
  );
};

export default Timeline;
