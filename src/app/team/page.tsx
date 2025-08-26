"use client";
import BackToTopButton from "@/components/BackToTop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TeamMember from "@/components/team/TeamMember";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "ONADEKO TEMITAYO PHILIPS",
    title: "CREATIVE HEAD",

    bio: [
      <span>
        Onadeko Temitayo Philips is a Professional Advertising and Commercial
        photographer working for over 13 years. In this time he has worked for
        many major advertising agencies, design groups, and direct clients of
        all.
      </span>,
      <span>
        He is trained to specialize in advanced Professional photography
        assignments around Products, People, Fashion, Glamour including
        advertising and editorials.
      </span>,
      <span>
        In addition to placing a priority on professionalism, he is also
        easygoing with a sense of humor & welcomes that clients enjoy the
        experience as well as receiving top-quality work.
      </span>,
      <span>
        A diverse range of clients such as{" "}
        <span className="font-semibold text-[#1D1D1B]">
          DSTV/Multichoice, Nokia, Smirnoff, Maltina, Dulux Paint, Lafarge
          Cement, Snapp, Schweppes, Ribena, Swift Networks Limited, Lead way
          Assurance, Airtel Nigeria, Peak Milk, Three Crowns Milk, Lucozade
          Nigeria, Gionee Mobile, Grand Oak Limited, Paga Nigeria, Indomie,
          Travelstart,
        </span>{" "}
        etc. When it comes to award-winning advertising and product photography
        that meets the goals of the client, only Temitayo can deliver the
        excellence these leading brands demand.
      </span>,
      <span className="font-medium text-[#1D1D1B]">
        Temitayo is currently working as a creative director and lead
        photographer at Belvaphilips Imagery.
      </span>,
    ],
    image: "/assets/team/Onadeko.png",
    imagePosition: "left" as const,
  },
  {
    name: "ONADEKO OMOLARA MARY",
    title: "HUMAN RESOURCE MANAGER",

    bio: [
      <span>
        Omolara Onadeko, M. is a seasoned entrepreneur and dynamic professional
        with a proven track record of success in Human Resources.
        <br />
        She attended Moshood Abiola Polytechnics (National Diploma in Business
        Administration ) in 2005. She holds a degree in Marketing from Lagos
        State University and began her career at Multichoice Limited in 2012 as
        a Sales/Marketing Officer. With a strong flair for customer engagement
        and operational efficiency, she transitioned to BeaufortBet in 2014 as a
        Customer Service Manager.
      </span>,
      <span>
        In 2016, Omolara joined ZenithBet Limited as Head of Operations, where
        she rose through the ranks while deepening her leadership and strategic
        skills. Driven by a passion for continuous growth, she became a
        certified Digital Marketer and Content Writer/Creator in 2020. To
        further enhance her managerial competencies, she is currently
        undertaking an advanced course in Project Management.
      </span>,
      <span>
        Today, Omolara serves as the Strategic Human Resources Director at
        Belvaphilips Imagery, where she draws on her diverse background in
        marketing, operations, and HR leadership to foster innovation and drive
        organizational success.
      </span>,
    ],
    image: "/assets/team/mary.png",
    imagePosition: "right" as const,
  },

  {
    name: "MARC DIKO",
    title: "VIDEOGRAPHER",

    bio: [
      <span>
        Marc is a passionate and driven individual with years of experience in
        videography and a background in Visual Effects. Committed to pushing the
        boundaries of visual storytelling, he constantly explores new creative
        possibilities. Beyond filmmaking, he enjoys playing basketball, working
        out, listening to music and drawing, always seeking new ways to expand
        his skills. Guided by the philosophy ‘Grow relentlessly, balance
        effortlessly,’ he strives for continuous improvement while maintaining
        harmony in all aspects of life.
      </span>,
    ],
    image: "/assets/team/marc.png",
    imagePosition: "left" as const,
  },
  {
    name: "Taiwo Olorunfunmi Adedoyin",
    title: "Client Support Officer",

    bio: [
      <span>
        My name is Olorunfunmi Taiwo Adedoyin. I'm a certified Customer service
        executive, I'm in my mid-twenties, a vibrant lady from Ogun State,
        Nigeria. I love singing and dancing, listening to good music. Enjoy
        exploring new places and would one day love to travel and experience the
        world and meeting great people. A lover of God. I value kindness,
        compassion and personal growth. <br />
        My goal is to make an infectious positive impact in the world.
        <br />
        Favorite quote; There is no enlightenment in shrinking so others can be
        comfortable around you.
      </span>,
    ],
    image: "/assets/team/funmi.png",
    imagePosition: "right" as const,
  },
  {
    name: "Onadeko Oluwatobiloba",
    title: "CONTENT CREATOR",

    bio: [
      <span>
        Onadeko Oluwatobiloba is a woman in her 20’s with a quiet yet profound
        presence , navigating the complexities of life with introspection and
        thoughtfulness.Born in a close knit community, Tobi has always been more
        reserved. Growing up Tobi often felt like an observer of life,
        contemplating the bigger question about identity, purpose and direction.
        Tobi has spent the last few years navigating the complex journey of
        discovering her true calling which has lead her to the world of content
        creation. Tobi remains open to new experiences but does so at her own
        pace , valuing genuineness and personal integrity above all else.
      </span>,
    ],
    image: "/assets/team/tobi.png",
    imagePosition: "left" as const,
  },
];

export default function TeamSection() {
  return (
    <>
      <section className="md:pt-[100px] pt-9">
        <div className="container mx-auto px-4 py-16">
          <motion.h2
            className="md:text-[82.83px] text-[38px] md:font-semibold font-bold mb-16 leading-[115%] text-[#1D1D1B] md:tracking-[-3px] tracking-[-0.5px]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            MEET THE TEAM
          </motion.h2>

          <div>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                title={member.title}
                bio={member.bio}
                image={member.image}
                imagePosition={member.imagePosition}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </>
  );
}
