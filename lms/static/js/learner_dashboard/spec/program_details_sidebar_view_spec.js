/*
eslint-disable import/no-extraneous-dependencies, import/no-duplicates, import/order, import/no-self-import,
import/no-cycle, import/no-relative-packages, import/no-named-as-default, import/no-named-as-default-member,
import/named, import/no-useless-path-segments
*/
/* globals setFixtures */

import Backbone from 'backbone';

import ProgramSidebarView from '../views/program_details_sidebar_view';

describe('Program Progress View', () => {
    let view = null;
    // Don't bother linting the format of the test data
    const data = {
        programData: {
            subtitle: 'Explore water management concepts and technologies.',
            overview: '\u003ch3\u003eXSeries Program Overview\u003c/h3\u003e\n\u003cp\u003eSafe water supply and hygienic water treatment are prerequisites for the well-being of communities all over the world. This Water XSeries, offered by the water management experts of TU Delft, will give you a unique opportunity to gain access to world-class knowledge and expertise in this field.\u003c/p\u003e\n\u003cp\u003eThis 3-course series will cover questions such as: How does climate change affect water cycle and public safety? How to use existing technologies to treat groundwater and surface water so we have safe drinking water? How do we take care of sewage produced in the cities on a daily basis? You will learn what are the physical, chemical and biological processes involved; carry out simple experiments at home; and have the chance to make a basic design of a drinking water treatment plant\u003c/p\u003e',
            weeks_to_complete: null,
            corporate_endorsements: [],
            video: null,
            type: 'XSeries',
            applicable_seat_types: ['verified', 'professional', 'credit'],
            max_hours_effort_per_week: null,
            transcript_languages: ['en-us'],
            expected_learning_items: [],
            uuid: '988e7ea8-f5e2-4d2e-998a-eae4ad3af322',
            title: 'Water Management',
            languages: ['en-us'],
            subjects: [{
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/engineering.jpg', name: 'Engineering', subtitle: 'Learn about engineering and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/engineering-1440x210.jpg', slug: 'engineering', description: 'Enroll in an online introduction to engineering course or explore specific areas such as structural, mechanical, electrical, software or aeronautical engineering. EdX offers free online courses in thermodynamics, robot mechanics, aerodynamics and more from top engineering universities.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/biology.jpg', name: 'Biology \u0026 Life Sciences', subtitle: 'Learn about biology and life sciences and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/plant-stomas-1440x210.jpg', slug: 'biology-life-sciences', description: 'Take free online biology courses in genetics, biotechnology, biochemistry, neurobiology and other disciplines. Courses include Fundamentals of Neuroscience from Harvard University, Molecular Biology from MIT and an Introduction to Bioethics from Georgetown.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/science.jpg', name: 'Science', subtitle: 'Learn about science and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/neuron-1440x210.jpg', slug: 'science', description: 'Science is one of the most popular subjects on edX and online courses range from beginner to advanced levels. Areas of study include neuroscience, genotyping, DNA methylation, innovations in environmental science, modern astrophysics and more from top universities and institutions worldwide.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/physics.jpg', name: 'Physics', subtitle: 'Learn about physics and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/header-bg-physics.png', slug: 'physics', description: 'Find online courses in quantum mechanics and magnetism the likes of MIT and Rice University or get an introduction to the violent universe from Australian National University.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/engery.jpg', name: 'Energy \u0026 Earth Sciences', subtitle: 'Learn about energy and earth sciences and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/energy-1440x210.jpg', slug: 'energy-earth-sciences', description: 'EdX\u2019s online Earth sciences courses cover very timely and important issues such as climate change and energy sustainability. Learn about natural disasters and our ability to predict them. Explore the universe with online courses in astrophysics, space plasmas and fusion energy.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/environmental-studies.jpg', name: 'Environmental Studies', subtitle: 'Learn about environmental studies, and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/environment-studies-1440x210.jpg', slug: 'environmental-studies', description: 'Take online courses in environmental science, natural resource management, environmental policy and civic ecology. Learn how to solve complex problems related to pollution control, water treatment and environmental sustainability with free online courses from leading universities worldwide.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/health.jpg', name: 'Health \u0026 Safety', subtitle: 'Learn about health and safety and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/health-and-safety-1440x210.jpg', slug: 'health-safety', description: 'From public health initiatives to personal wellbeing, find online courses covering a wide variety of health and medical subjects. Enroll in free courses from major universities on topics like epidemics, global healthcare and the fundamentals of clinical trials.',
            }, {
                card_image_url: 'https://stage.edx.org/sites/default/files/subject/image/card/electronics.jpg', name: 'Electronics', subtitle: 'Learn about electronics and more from the best universities and institutions around the world.', banner_image_url: 'https://stage.edx.org/sites/default/files/electronics-a-1440x210.jpg', slug: 'electronics', description: 'The online courses in electrical engineering explore computation structures, electronic interfaces and the principles of electric circuits. Learn the engineering behind drones and autonomous robots or find out how organic electronic devices are changing the way humans interact with machines.',
            }],
            individual_endorsements: [],
            staff: [{
                family_name: 'Smets', uuid: '6078b3dd-ade4-457d-9262-7439a5f4b07e', bio: 'Dr. Arno H.M. Smets is Professor in Solar Energy in the Photovoltaics Material and Devices group at the faculty of Electrical Engineering, Mathematics and Computer Science, Delft University of Technology. From 2005-2010 he worked at the Research Center for Photovoltaics at the National Institute of Advanced Industrial Science and Technology (AIST) in Tsukuba Japan. His research work is focused on processing of thin silicon films, innovative materials and new concepts for photovoltaic applications. He is lecturer for BSc and MSc courses on Photovoltaics and Sustainable Energy at TU Delft. His online edX course on Solar Energy attracted over 150,000 students worldwide. He is co-author of the book \u003cem\u003e\u201cSolar Energy. The physics and engineering of photovoltaic conversion technologies and systems.\u201d\u003c/em\u003e', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/arno-smets_x110.jpg', given_name: 'Arno', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Professor, Electrical Engineering, Mathematics and Computer Science' }, works: [], slug: 'arno-smets',
            }, {
                family_name: 'van de Giesen', uuid: '0e28153f-4e9f-4080-b56f-43480600ecd7', bio: 'Since July 2004, Nick van de Giesen has held the Van Kuffeler Chair of Water Resources Management of the Faculty of Civil Engineering and Geosciences. He teaches Integrated Water Resources Management and Water Management. His main interests are the modeling of complex water resources systems and the development of science-based decision support systems. The interaction between water systems and their users is the core theme in both research portfolio and teaching curriculum. Since 1 April 2009, he is chairman of the \u003ca href="http://www.environment.tudelft.nl"\u003eDelft Research Initiative Environment\u003c/a\u003e.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/giesen_vd_nick_110p.jpg', given_name: 'Nick', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'nick-van-de-giesen',
            }, {
                family_name: 'Russchenberg', uuid: '8a94bdb9-ac44-4bc1-a3d2-306f391682b4', bio: 'Herman Russchenberg is engaged in intensive and extensive research into the causes of climate change. His own research involves investigating the role played by clouds and dust particles in the atmosphere, but he is also head of the TU Delft Climate Institute, established in March 2012 to bring together TU Delft researchers working on all aspects of climate and climate change. Russchenberg started out in the faculty of Electrical Engineering, conducting research into the influence of the atmosphere (rain, clouds) on satellite signals. After obtaining his PhD in 1992, he shifted his attention to the physics of water vapour, water droplets, dust particles, sunlight, radiation and emissions in the atmosphere. He is now based in the faculty of Civil Engineering and Geosciences.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/russchenberg_herman_110p.jpg', given_name: 'Herman', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'herman-russchenberg',
            }, {
                family_name: 'Savenije', uuid: '4ebdcd93-bb4e-4c0c-9faf-4e513b1a2e33', bio: 'Prof. Savenije was born in 1952 in the Netherlands and studied at the Delft University of Technology, in the Netherlands, where he obtained his MSc in 1977 in Hydrology. As a young graduate hydrologist he worked for six years in Mozambique where he developed a theory on salt intrusion in estuaries and studied the hydrology of international rivers. From 1985-1990 he worked as an international consultant mostly in Asia and Africa. He joined academia in 1990 to complete his PhD in 1992. In 1994 he was appointed Professor of Water Resources Management at the IHE (now UNESCO-IHE, Institute for Water Education) in Delft, the Netherlands. Since 1999, he is Professor of Hydrology at the Delft University of Technology, where he is the head of the Water Resources Section. He is President of the International Association of Hydrological Sciences and Executive Editor of the journal Hydrology and Earth System Sciences.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/savenije_hubert_110p.jpg', given_name: 'Hubert', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'hubert-savenije',
            }, {
                family_name: 'Stive', uuid: 'a7364bab-8e9c-4265-bd14-598afac1f086', bio: 'Marcel Stive studied Civil engineering at the Delft University of Technology, where he graduated in 1977 and received his doctorate in 1988. After graduating in 1977 Stive started working at WL-Delft Hydraulics, where he worked until 1992. In 1992 he became a professor at the Polytechnic University of Catalonia in Barcelona, Spain. In 1994 her returned to WL-Delft Hydraulics and at the same time began to work as a professor of Coastal Morphodynamics at the Delft University of Technology. Since 2001 Stive is a professor of Coastal Engineering at Delft University of Technology and he is the scientific director of the Water Research Centre Delft since 2003.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/stive_marcel_110p.jpg', given_name: 'Marcel', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'TU Delft', title: 'Professor' }, works: [], slug: 'marcel-stive',
            }, {
                family_name: 'Rietveld', uuid: '1b70c71d-20cc-487d-be10-4b31baeff559', bio: '\u003cp\u003eLuuk Rietveld is professor of Urban Water Cycle Technology at Delft University of Technology. After finalizing his studies in Civil Engineering at Delft University of Technology in 1987, he worked, until 1991, as lecturer/researcher in Sanitary Engineering at the Eduardo Mondlane University, Maputo, Mozambique. Between 1991 and 1994, he was employed at the Management Centre for International Co-operation, and since 1994 he has had an appointment at the Department of Water Management of Delft University of Technology. In 2005, he defended his PhD thesis entitled "Improving Operation of Drinking Water Treatment through Modelling".\u003c/p\u003e\n\u003cp\u003eLuuk Rietveld\u2019s main research interests are modelling and optimisation of processes in the urban water cycle, and technological innovations in drinking water treatment and water reclamation for industrial purposes. In addition, he has extensive experience in education, in various cultural contexts, and is interested to explore the use of new ways of teaching through activated and blended learning and MOOCs.\u003c/p\u003e', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/rietveld_luuk_110p.jpg', given_name: 'Luuk', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'luuk-rietveld-0',
            }, {
                family_name: 'van Halem', uuid: '4ce9ef2a-19e9-46de-9f34-5d755f26736a', bio: 'Doris van Halem is a tenure track Assistant Professor within the Department of Water Management, section Sanitary Engineering of Delft University of Technology. She graduated from Delft University of Technology in Civil Engineering and Geosciences with a cum laude MSc degree (2007). During her studies she developed an interest in global drinking water challenges, illustrated by her internships in Sri Lanka and Benin, resulting in an MSc thesis \u201cCeramic silver impregnated pot filter for household drinking water treatment in developing countries\u201d. In 2011 she completed her PhD research (with honours) on subsurface iron and arsenic removal for drinking water supply in Bangladesh under the guidance of prof. J.C. van Dijk (TU Delft) and prof. dr. G.L. Amy (Unesco-IHE). Currently she supervises BSc, MSc and PhD students, focusing on inorganic constituent behaviour and trace compound removal during soil passage and drinking water treatment - with a particular interest in smart, pro-poor drinking water solutions.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/doris_van_halem_1.jpg', given_name: 'Doris', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Assistant Professor, Sanitary Engineering' }, works: [], slug: 'doris-van-halem-0',
            }, {
                family_name: 'Grefte', uuid: '463c3f1a-95fc-45aa-b7c0-d01b14126f02', bio: 'Anke Grefte is project manager open, online and blended education for the Faculty of Civil Engineering and Geosciences, Delft University of Technology. She graduated from Delft University of Technology in Civil Engineering with a master\u2019s thesis entitled "Behaviour of particles in a drinking water distribution network; test rig results". For this thesis Anke was awarded the Gijs Oskam award for best young researcher. In November 2013, she finished her Ph.D. research on the removal of Natural Organic Matter (NOM) fractions by ion exchange and the impact on drinking water treatment processes and biological stability.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/grefte_anke_110p.jpg', given_name: 'Anke', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'anke-grefte-0',
            }, {
                family_name: 'Lier', uuid: '349aa2cc-0107-4632-ad10-869f23966049', bio: 'Jules van Lier is full professor of Environmental Engineering and Wastewater Treatment at the Sanitary Engineering Section of Delft University of Technology and has a 1 day per week posted position at the Unesco-IHE Institute for Water Education, also in Delft Jules van Lier accomplished his PhD on Thermophilic Anaerobic Wastewater Treatment under the supervision of Prof. Gatze Lettinga (1995) at Wageningen University. Throughout his career he has been involved as a senior researcher / project manager in various (inter)national research projects, working on cost-effective water treatment for resource recovery (water, nutrients, biogas, elements). His research projects are focused on closing water cycles in industries and sewage water recovery for irrigated agriculture. The further development of anaerobic treatment technology is his prime focus. In addition to university work he is an Executive Board Member and Scientific Advisor to the LeAF Foundation; regional representative for Western Europe Anaerobic Digestion Specialist group of the International Water Association (IWA); editor of scientific journals (e.g Water Science Technology and Advances in Environmental Research and Development); member of the Paques Technological Advisory Commission; and member of the Advisory Board of World-Waternet, Amsterdam.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/lier_van_jules_110p.jpg', given_name: 'Jules van', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Professor, Sanitary Engineering' }, works: [], slug: 'jules-van-lier',
            }, {
                family_name: 'Kreuk', uuid: 'c1e50a84-1b09-47b5-b704-5e16309d0cba', bio: 'Merle de Kreuk is a wastewater Associate Professor at the Sanitary Engineering department of the Delft University of Technology. Her research focus is on (municipal and industrial) wastewater treatment systems and anaerobic processes, aiming to link the world of Biotechnology to the Civil Engineering, as well as fundamental research to industrial applications. Her main research topics are hydrolysis processes in anaerobic treatment and granule formation and deterioration. Merle\u2019s PhD and Post-Doc research involved the development of aerobic granular sludge technology and up scaling the technology from a three litre lab scale reactor to the full scale Nereda\u00ae process\u00ae. The first application of aerobic granular sludge technology in the Netherlands was opened in May 2012, and currently many more installations are being built, due to its compactness, low energy use and good effluent characteristics. Her previous work experience also involved the position of water treatment technology innovator at Water authority Hollandse Delta on projects such as the Energy Factory in which 14 water authorities cooperated to develop an energy producing sewage treatment plant.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/kreuk_de_merle_110p.jpg', given_name: 'Merle de', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Associate Professor, Sanitary Engineering' }, works: [], slug: 'merle-de-kreuk',
            }],
            marketing_slug: 'water-management',
            marketing_url: 'https://stage.edx.org/xseries/water-management',
            status: 'active',
            credit_redemption_overview: 'These courses can be taken in any order.',
            card_image_url: 'https://stage.edx.org/sites/default/files/card/images/waterxseries_course0.png',
            faq: [],
            price_ranges: [{
                currency: 'USD', max: 15.0, total: 35.0, min: 10.0,
            }],
            banner_image: {
                small: { url: 'https://d385l2sek0vys7.cloudfront.net/media/programs/banner_images/988e7ea8-f5e2-4d2e-998a-eae4ad3af322.small.jpg', width: 435, height: 145 }, large: { url: 'https://d385l2sek0vys7.cloudfront.net/media/programs/banner_images/988e7ea8-f5e2-4d2e-998a-eae4ad3af322.large.jpg', width: 1440, height: 480 }, medium: { url: 'https://d385l2sek0vys7.cloudfront.net/media/programs/banner_images/988e7ea8-f5e2-4d2e-998a-eae4ad3af322.medium.jpg', width: 726, height: 242 }, 'x-small': { url: 'https://d385l2sek0vys7.cloudfront.net/media/programs/banner_images/988e7ea8-f5e2-4d2e-998a-eae4ad3af322.x-small.jpg', width: 348, height: 116 },
            },
            authoring_organizations: [{
                description: 'Delft University of Technology is the largest and oldest technological university in the Netherlands. Our research is inspired by the desire to increase fundamental understanding, as well as by societal challenges. We encourage our students to be independent thinkers so they will become engineers capable of solving complex problems. Our students have chosen Delft University of Technology because of our reputation for quality education and research.', tags: ['charter', 'contributor'], name: 'Delft University of Technology (TU Delft)', homepage_url: null, key: 'DelftX', certificate_logo_image_url: null, marketing_url: 'https://stage.edx.org/school/delftx', logo_image_url: 'https://stage.edx.org/sites/default/files/school/image/banner/delft_logo_200x101_0.png', uuid: 'c484a523-d396-4aff-90f4-bb7e82e16bf6',
            }],
            job_outlook_items: [],
            credit_backing_organizations: [],
            weeks_to_complete_min: 4,
            weeks_to_complete_max: 8,
            min_hours_effort_per_week: null,
            pathway_ids: [95],
        },
        courseData: {
            completed: [{
                owners: [{ uuid: 'c484a523-d396-4aff-90f4-bb7e82e16bf6', key: 'DelftX', name: 'Delft University of Technology (TU Delft)' }],
                uuid: '4ce7a648-3172-475a-84f3-9f843b2157f3',
                title: 'Introduction to Water and Climate',
                image: {
                    src: 'https://stage.edx.org/sites/default/files/course/image/promoted/wc_home_378x225.jpg', height: null, description: null, width: null,
                },
                key: 'Delftx+CTB3300WCx',
                course_runs: [{
                    upgrade_url: null,
                    image: {
                        src: 'https://stage.edx.org/sites/default/files/course/image/promoted/wc_home_378x225.jpg', height: null, description: null, width: null,
                    },
                    max_effort: null,
                    is_enrollment_open: true,
                    course: 'Delftx+CTB3300WCx',
                    content_language: 'en-us',
                    eligible_for_financial_aid: true,
                    seats: [{
                        sku: '18AC1BC', credit_hours: null, price: '0.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'honor',
                    }, {
                        sku: '86A734B', credit_hours: null, price: '10.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'verified',
                    }],
                    course_url: '/courses/course-v1:Delftx+CTB3300WCx+2015_T3/',
                    availability: 'Archived',
                    transcript_languages: ['en-us'],
                    staff: [{
                        family_name: 'van de Giesen', uuid: '0e28153f-4e9f-4080-b56f-43480600ecd7', bio: 'Since July 2004, Nick van de Giesen has held the Van Kuffeler Chair of Water Resources Management of the Faculty of Civil Engineering and Geosciences. He teaches Integrated Water Resources Management and Water Management. His main interests are the modeling of complex water resources systems and the development of science-based decision support systems. The interaction between water systems and their users is the core theme in both research portfolio and teaching curriculum. Since 1 April 2009, he is chairman of the \u003ca href="http://www.environment.tudelft.nl"\u003eDelft Research Initiative Environment\u003c/a\u003e.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/giesen_vd_nick_110p.jpg', given_name: 'Nick', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'nick-van-de-giesen',
                    }, {
                        family_name: 'Russchenberg', uuid: '8a94bdb9-ac44-4bc1-a3d2-306f391682b4', bio: 'Herman Russchenberg is engaged in intensive and extensive research into the causes of climate change. His own research involves investigating the role played by clouds and dust particles in the atmosphere, but he is also head of the TU Delft Climate Institute, established in March 2012 to bring together TU Delft researchers working on all aspects of climate and climate change. Russchenberg started out in the faculty of Electrical Engineering, conducting research into the influence of the atmosphere (rain, clouds) on satellite signals. After obtaining his PhD in 1992, he shifted his attention to the physics of water vapour, water droplets, dust particles, sunlight, radiation and emissions in the atmosphere. He is now based in the faculty of Civil Engineering and Geosciences.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/russchenberg_herman_110p.jpg', given_name: 'Herman', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'herman-russchenberg',
                    }, {
                        family_name: 'Savenije', uuid: '4ebdcd93-bb4e-4c0c-9faf-4e513b1a2e33', bio: 'Prof. Savenije was born in 1952 in the Netherlands and studied at the Delft University of Technology, in the Netherlands, where he obtained his MSc in 1977 in Hydrology. As a young graduate hydrologist he worked for six years in Mozambique where he developed a theory on salt intrusion in estuaries and studied the hydrology of international rivers. From 1985-1990 he worked as an international consultant mostly in Asia and Africa. He joined academia in 1990 to complete his PhD in 1992. In 1994 he was appointed Professor of Water Resources Management at the IHE (now UNESCO-IHE, Institute for Water Education) in Delft, the Netherlands. Since 1999, he is Professor of Hydrology at the Delft University of Technology, where he is the head of the Water Resources Section. He is President of the International Association of Hydrological Sciences and Executive Editor of the journal Hydrology and Earth System Sciences.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/savenije_hubert_110p.jpg', given_name: 'Hubert', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'hubert-savenije',
                    }, {
                        family_name: 'Stive', uuid: 'a7364bab-8e9c-4265-bd14-598afac1f086', bio: 'Marcel Stive studied Civil engineering at the Delft University of Technology, where he graduated in 1977 and received his doctorate in 1988. After graduating in 1977 Stive started working at WL-Delft Hydraulics, where he worked until 1992. In 1992 he became a professor at the Polytechnic University of Catalonia in Barcelona, Spain. In 1994 her returned to WL-Delft Hydraulics and at the same time began to work as a professor of Coastal Morphodynamics at the Delft University of Technology. Since 2001 Stive is a professor of Coastal Engineering at Delft University of Technology and he is the scientific director of the Water Research Centre Delft since 2003.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/stive_marcel_110p.jpg', given_name: 'Marcel', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'TU Delft', title: 'Professor' }, works: [], slug: 'marcel-stive',
                    }],
                    announcement: '2015-06-09T00:00:00Z',
                    end: '2015-11-04T12:00:00Z',
                    uuid: 'a36f5673-6637-11e6-a8e3-22000bdde520',
                    title: 'Introduction to Water and Climate',
                    certificate_url: '/certificates/a37c59143d9d422eb6ab11e1053b8eb5',
                    enrollment_start: null,
                    start: '2015-09-01T04:00:00Z',
                    min_effort: null,
                    short_description: 'Explore how climate change, water availability, and engineering innovation are key challenges for our planet.',
                    hidden: false,
                    level_type: 'Intermediate',
                    type: 'verified',
                    enrollment_open_date: 'Jan 01, 1900',
                    marketing_url: 'https://stage.edx.org/course/introduction-water-climate-delftx-ctb3300wcx-0',
                    is_course_ended: true,
                    instructors: [],
                    full_description: '\u003cp\u003eWater is essential for life on earth and of crucial importance for society. Cycling across the planet and the atmosphere, it also has a major influence on our climate.\u003c/p\u003e\n\u003cp\u003eWeekly modules are hosted by four different professors, all of them being international experts in their field. The course consists of knowledge clips, movies, exercises, discussion and homework assignments. It finishes with an examination.\u003c/p\u003e\n\u003cp\u003eThis course combined with the courses "Introduction to Drinking Water Treatment" (new edition to start in January 2016) and "Introduction to the Treatment of Urban Sewage" (new edition to start in April 2016) forms the Water XSeries, Faculty of Civil Engineering and Geosciences, TU Delft.\u003c/p\u003e\n\u003cp\u003e\u003cem\u003e\u003cstrong\u003eLICENSE\u003c/strong\u003e\u003cbr /\u003e\nThe course materials of this course are Copyright Delft University of Technology and are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike (CC-BY-NC-SA) 4.0 International License.\u003c/em\u003e\u003c/p\u003e',
                    key: 'course-v1:Delftx+CTB3300WCx+2015_T3',
                    enrollment_end: null,
                    reporting_type: 'mooc',
                    advertised_start: null,
                    mobile_available: true,
                    modified: '2017-04-06T12:26:52.594942Z',
                    is_enrolled: false,
                    pacing_type: 'instructor_paced',
                    video: {
                        src: 'http://www.youtube.com/watch?v=dJEhwq0sXiQ',
                        image: {
                            src: 'https://stage.edx.org/sites/default/files/course/image/featured-card/wc_home_378x225.jpg', width: null, description: null, height: null,
                        },
                        description: null,
                    },
                }],
            }, {
                owners: [{ uuid: 'c484a523-d396-4aff-90f4-bb7e82e16bf6', key: 'DelftX', name: 'Delft University of Technology (TU Delft)' }],
                uuid: 'a0aade38-7a50-4afb-97cd-2214c572cc86',
                title: 'Urban Sewage Treatment',
                image: {
                    src: 'https://stage.edx.org/sites/default/files/course/image/promoted/sewage_home_378x225.jpg', height: null, description: null, width: null,
                },
                key: 'DelftX+CTB3365STx',
                course_runs: [{
                    upgrade_url: null,
                    image: {
                        src: 'https://stage.edx.org/sites/default/files/course/image/promoted/sewage_home_378x225.jpg', height: null, description: null, width: null,
                    },
                    max_effort: null,
                    is_enrollment_open: true,
                    course: 'DelftX+CTB3365STx',
                    content_language: 'en-us',
                    eligible_for_financial_aid: true,
                    seats: [{
                        sku: '01CDD4F', credit_hours: null, price: '0.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'honor',
                    }, {
                        sku: 'B4F253D', credit_hours: null, price: '10.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'verified',
                    }],
                    course_url: '/courses/course-v1:Delftx+CTB3365STx+1T2016/',
                    availability: 'Archived',
                    transcript_languages: ['en-us'],
                    staff: [{
                        family_name: 'Lier', uuid: '349aa2cc-0107-4632-ad10-869f23966049', bio: 'Jules van Lier is full professor of Environmental Engineering and Wastewater Treatment at the Sanitary Engineering Section of Delft University of Technology and has a 1 day per week posted position at the Unesco-IHE Institute for Water Education, also in Delft Jules van Lier accomplished his PhD on Thermophilic Anaerobic Wastewater Treatment under the supervision of Prof. Gatze Lettinga (1995) at Wageningen University. Throughout his career he has been involved as a senior researcher / project manager in various (inter)national research projects, working on cost-effective water treatment for resource recovery (water, nutrients, biogas, elements). His research projects are focused on closing water cycles in industries and sewage water recovery for irrigated agriculture. The further development of anaerobic treatment technology is his prime focus. In addition to university work he is an Executive Board Member and Scientific Advisor to the LeAF Foundation; regional representative for Western Europe Anaerobic Digestion Specialist group of the International Water Association (IWA); editor of scientific journals (e.g Water Science Technology and Advances in Environmental Research and Development); member of the Paques Technological Advisory Commission; and member of the Advisory Board of World-Waternet, Amsterdam.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/lier_van_jules_110p.jpg', given_name: 'Jules van', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Professor, Sanitary Engineering' }, works: [], slug: 'jules-van-lier',
                    }, {
                        family_name: 'Kreuk', uuid: 'c1e50a84-1b09-47b5-b704-5e16309d0cba', bio: 'Merle de Kreuk is a wastewater Associate Professor at the Sanitary Engineering department of the Delft University of Technology. Her research focus is on (municipal and industrial) wastewater treatment systems and anaerobic processes, aiming to link the world of Biotechnology to the Civil Engineering, as well as fundamental research to industrial applications. Her main research topics are hydrolysis processes in anaerobic treatment and granule formation and deterioration. Merle\u2019s PhD and Post-Doc research involved the development of aerobic granular sludge technology and up scaling the technology from a three litre lab scale reactor to the full scale Nereda\u00ae process\u00ae. The first application of aerobic granular sludge technology in the Netherlands was opened in May 2012, and currently many more installations are being built, due to its compactness, low energy use and good effluent characteristics. Her previous work experience also involved the position of water treatment technology innovator at Water authority Hollandse Delta on projects such as the Energy Factory in which 14 water authorities cooperated to develop an energy producing sewage treatment plant.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/kreuk_de_merle_110p.jpg', given_name: 'Merle de', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Associate Professor, Sanitary Engineering' }, works: [], slug: 'merle-de-kreuk',
                    }],
                    announcement: '2015-07-24T00:00:00Z',
                    end: '2016-07-01T22:30:00Z',
                    uuid: 'a36f70c1-6637-11e6-a8e3-22000bdde520',
                    title: 'Introduction to the Treatment of Urban Sewage',
                    certificate_url: '/certificates/bed3980e67ca40f0b31e309d9dfe9e7e',
                    enrollment_start: null,
                    start: '2016-04-12T04:00:00Z',
                    min_effort: null,
                    short_description: 'Learn about urban water services, focusing on basic sewage treatment technologies.',
                    hidden: false,
                    level_type: 'Intermediate',
                    type: 'verified',
                    enrollment_open_date: 'Jan 01, 1900',
                    marketing_url: 'https://stage.edx.org/course/introduction-treatment-urban-sewage-delftx-ctb3365stx-0',
                    is_course_ended: true,
                    instructors: [],
                    full_description: '\u003cp\u003eThis course will focus on basic technologies for the treatment of urban sewage. Unit processes involved in the treatment chain will be described as well as the physical, chemical and biological processes involved. There will be an emphasis on water quality and the functionality of each unit process within the treatment chain. After the course one should be able to recognise the process units, describe their function and make simple design calculations on urban sewage treatment plants.\u003c/p\u003e\n\u003cp\u003eThe course consists of 6 modules:\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003eSewage treatment plant overview. In this module you will learn what major pollutants are present in the sewage and why we need to treat sewage prior to discharge to surface waters. The functional units will be briefly discussed\u003c/li\u003e\n\u003cli\u003ePrimary treatment. In this module you learn how coarse material, sand \u0026 grit are removed from the sewage and how to design primary clarification tanks\u003c/li\u003e\n\u003cli\u003eBiological treatment. In this module you learn the basics of the carbon, nitrogen and phosphorous cycle and how biological processes are used to treat the main pollutants of concern.\u003c/li\u003e\n\u003cli\u003eActivated sludge process. In this module you learn the design principles of conventional activated sludge processes including the secondary clarifiers and aeration demand of aeration tanks.\u003c/li\u003e\n\u003cli\u003eNitrogen and phosphorus removal. In this module you learn the principles of biological nitrogen removal as well as phosphorus removal by biological and/or chemical means.\u003c/li\u003e\n\u003cli\u003eSludge treatment. In this module you will the design principles of sludge thickeners, digesters and dewatering facilities for the concentration and stabilisation of excess sewage sludge. Potentials for energy recovery via the produced biogas will be discussed as well as the direct anaerobic treatment of urban sewage in UASB reactors when climate conditions allow.\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003eThis course in combination with the courses "\u003ca href="https://www.edx.org/course/introduction-water-climate-delftx-ctb3300wcx-0"\u003eIntroduction to Water and Climate\u003c/a\u003e" and "\u003ca href="https://www.edx.org/course/introduction-drinking-water-treatment-delftx-ctb3365dwx-0"\u003eIntroduction to Drinking Water Treatment\u003c/a\u003e" forms the Water XSeries, by DelftX.\u003c/p\u003e\n\u003chr /\u003e\n\u003cp\u003e\u003cstrong\u003e\u003cem\u003eLICENSE\u003c/em\u003e\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003e\u003cem\u003eThe course materials of this course are Copyright Delft University of Technology and are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike (CC-BY-NC-SA) 4.0 International License.\u003c/em\u003e\u003c/p\u003e',
                    key: 'course-v1:Delftx+CTB3365STx+1T2016',
                    enrollment_end: null,
                    reporting_type: 'mooc',
                    advertised_start: null,
                    mobile_available: true,
                    modified: '2017-04-06T12:26:52.679900Z',
                    is_enrolled: true,
                    pacing_type: 'instructor_paced',
                    video: {
                        src: 'http://www.youtube.com/watch?v=pcSsOE-F4e8',
                        image: {
                            src: 'https://stage.edx.org/sites/default/files/course/image/featured-card/sewage_home_378x225.jpg', width: null, description: null, height: null,
                        },
                        description: null,
                    },
                }],
            }],
            in_progress: [],
            uuid: '988e7ea8-f5e2-4d2e-998a-eae4ad3af322',
            not_started: [{
                owners: [{ uuid: 'c484a523-d396-4aff-90f4-bb7e82e16bf6', key: 'DelftX', name: 'Delft University of Technology (TU Delft)' }],
                uuid: '51275d00-1f3f-462f-8231-ce42821cc1dd',
                title: 'Solar Energy',
                image: {
                    src: 'https://stage.edx.org/sites/default/files/course/image/promoted/solar-energy_378x225.jpg', height: null, description: null, width: null,
                },
                key: 'DelftX+ET3034TUx',
                course_runs: [{
                    upgrade_url: null,
                    image: {
                        src: 'https://stage.edx.org/sites/default/files/course/image/promoted/solar-energy_378x225.jpg', height: null, description: null, width: null,
                    },
                    max_effort: null,
                    is_enrollment_open: true,
                    course: 'DelftX+ET3034TUx',
                    content_language: null,
                    eligible_for_financial_aid: true,
                    seats: [{
                        sku: 'E433FA8', credit_hours: null, price: '0.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'honor',
                    }],
                    course_url: '/courses/DelftX/ET3034TUx/2013_Fall/',
                    availability: 'Archived',
                    transcript_languages: [],
                    staff: [{
                        family_name: 'Smets', uuid: '6078b3dd-ade4-457d-9262-7439a5f4b07e', bio: 'Dr. Arno H.M. Smets is Professor in Solar Energy in the Photovoltaics Material and Devices group at the faculty of Electrical Engineering, Mathematics and Computer Science, Delft University of Technology. From 2005-2010 he worked at the Research Center for Photovoltaics at the National Institute of Advanced Industrial Science and Technology (AIST) in Tsukuba Japan. His research work is focused on processing of thin silicon films, innovative materials and new concepts for photovoltaic applications. He is lecturer for BSc and MSc courses on Photovoltaics and Sustainable Energy at TU Delft. His online edX course on Solar Energy attracted over 150,000 students worldwide. He is co-author of the book \u003cem\u003e\u201cSolar Energy. The physics and engineering of photovoltaic conversion technologies and systems.\u201d\u003c/em\u003e', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/arno-smets_x110.jpg', given_name: 'Arno', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Professor, Electrical Engineering, Mathematics and Computer Science' }, works: [], slug: 'arno-smets',
                    }],
                    announcement: '2013-05-08T00:00:00Z',
                    end: '2013-12-06T10:30:00Z',
                    uuid: 'f33a9660-b5d0-47a9-9bfa-a326d9ed4ef2',
                    title: 'Solar Energy',
                    certificate_url: null,
                    enrollment_start: null,
                    start: '2013-09-16T04:00:00Z',
                    min_effort: null,
                    short_description: 'Discover the power of solar energy and design a complete photovoltaic system.',
                    hidden: false,
                    level_type: null,
                    type: 'honor',
                    enrollment_open_date: 'Jan 01, 1900',
                    marketing_url: 'https://stage.edx.org/course/solar-energy-delftx-et3034tux',
                    is_course_ended: true,
                    instructors: [],
                    full_description: '',
                    key: 'DelftX/ET3034TUx/2013_Fall',
                    enrollment_end: null,
                    reporting_type: 'mooc',
                    advertised_start: null,
                    mobile_available: false,
                    modified: '2017-04-06T12:26:54.345710Z',
                    is_enrolled: false,
                    pacing_type: 'instructor_paced',
                    video: { src: 'http://www.youtube.com/watch?v=LLiNzrIubF0', image: null, description: null },
                }],
            }, {
                owners: [{ uuid: 'c484a523-d396-4aff-90f4-bb7e82e16bf6', key: 'DelftX', name: 'Delft University of Technology (TU Delft)' }],
                uuid: '7c430382-d477-4bac-9c29-f36c24f1935f',
                title: 'Drinking Water Treatment',
                image: {
                    src: 'https://stage.edx.org/sites/default/files/course/image/promoted/drinking_water_home_378x225.jpg', height: null, description: null, width: null,
                },
                key: 'DelftX+CTB3365DWx',
                course_runs: [{
                    upgrade_url: null,
                    image: {
                        src: 'https://stage.edx.org/sites/default/files/course/image/promoted/drinking_water_home_378x225.jpg', height: null, description: null, width: null,
                    },
                    max_effort: null,
                    is_enrollment_open: true,
                    course: 'DelftX+CTB3365DWx',
                    content_language: 'en-us',
                    eligible_for_financial_aid: true,
                    seats: [{
                        sku: '74AC06B', credit_hours: 100, price: '15.00', currency: 'USD', upgrade_deadline: '2016-04-30T00:00:00Z', credit_provider: 'mit', type: 'credit',
                    }, {
                        sku: '0BBAE34', credit_hours: null, price: '0.00', currency: 'USD', upgrade_deadline: null, credit_provider: null, type: 'honor',
                    }, {
                        sku: '8E52FAE', credit_hours: null, price: '10.00', currency: 'USD', upgrade_deadline: '2016-03-25T01:06:00Z', credit_provider: null, type: 'verified',
                    }],
                    course_url: '/courses/course-v1:DelftX+CTB3365DWx+1T2016/',
                    availability: 'Current',
                    transcript_languages: ['en-us'],
                    staff: [{
                        family_name: 'Rietveld', uuid: '1b70c71d-20cc-487d-be10-4b31baeff559', bio: '\u003cp\u003eLuuk Rietveld is professor of Urban Water Cycle Technology at Delft University of Technology. After finalizing his studies in Civil Engineering at Delft University of Technology in 1987, he worked, until 1991, as lecturer/researcher in Sanitary Engineering at the Eduardo Mondlane University, Maputo, Mozambique. Between 1991 and 1994, he was employed at the Management Centre for International Co-operation, and since 1994 he has had an appointment at the Department of Water Management of Delft University of Technology. In 2005, he defended his PhD thesis entitled "Improving Operation of Drinking Water Treatment through Modelling".\u003c/p\u003e\n\u003cp\u003eLuuk Rietveld\u2019s main research interests are modelling and optimisation of processes in the urban water cycle, and technological innovations in drinking water treatment and water reclamation for industrial purposes. In addition, he has extensive experience in education, in various cultural contexts, and is interested to explore the use of new ways of teaching through activated and blended learning and MOOCs.\u003c/p\u003e', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/rietveld_luuk_110p.jpg', given_name: 'Luuk', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'luuk-rietveld-0',
                    }, {
                        family_name: 'van Halem', uuid: '4ce9ef2a-19e9-46de-9f34-5d755f26736a', bio: 'Doris van Halem is a tenure track Assistant Professor within the Department of Water Management, section Sanitary Engineering of Delft University of Technology. She graduated from Delft University of Technology in Civil Engineering and Geosciences with a cum laude MSc degree (2007). During her studies she developed an interest in global drinking water challenges, illustrated by her internships in Sri Lanka and Benin, resulting in an MSc thesis \u201cCeramic silver impregnated pot filter for household drinking water treatment in developing countries\u201d. In 2011 she completed her PhD research (with honours) on subsurface iron and arsenic removal for drinking water supply in Bangladesh under the guidance of prof. J.C. van Dijk (TU Delft) and prof. dr. G.L. Amy (Unesco-IHE). Currently she supervises BSc, MSc and PhD students, focusing on inorganic constituent behaviour and trace compound removal during soil passage and drinking water treatment - with a particular interest in smart, pro-poor drinking water solutions.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/doris_van_halem_1.jpg', given_name: 'Doris', urls: { blog: null, twitter: null, facebook: null }, position: { organization_name: 'Delft University of Technology', title: 'Assistant Professor, Sanitary Engineering' }, works: [], slug: 'doris-van-halem-0',
                    }, {
                        family_name: 'Grefte', uuid: '463c3f1a-95fc-45aa-b7c0-d01b14126f02', bio: 'Anke Grefte is project manager open, online and blended education for the Faculty of Civil Engineering and Geosciences, Delft University of Technology. She graduated from Delft University of Technology in Civil Engineering with a master\u2019s thesis entitled "Behaviour of particles in a drinking water distribution network; test rig results". For this thesis Anke was awarded the Gijs Oskam award for best young researcher. In November 2013, she finished her Ph.D. research on the removal of Natural Organic Matter (NOM) fractions by ion exchange and the impact on drinking water treatment processes and biological stability.', profile_image: {}, profile_image_url: 'https://stage.edx.org/sites/default/files/person/image/grefte_anke_110p.jpg', given_name: 'Anke', urls: { blog: null, twitter: null, facebook: null }, position: null, works: [], slug: 'anke-grefte-0',
                    }],
                    announcement: '2015-07-24T00:00:00Z',
                    end: '2017-07-20T21:30:00Z',
                    uuid: 'a36ed16a-6637-11e6-a8e3-22000bdde520',
                    title: 'Introduction to Drinking Water Treatment',
                    certificate_url: null,
                    enrollment_start: '2016-06-15T00:00:00Z',
                    start: '2016-01-12T05:00:00Z',
                    min_effort: null,
                    short_description: 'Learn about urban water services, focusing on conventional technologies for drinking water treatment.',
                    hidden: false,
                    level_type: 'Intermediate',
                    type: 'credit',
                    enrollment_open_date: 'Jun 15, 2016',
                    marketing_url: 'https://stage.edx.org/course/introduction-drinking-water-treatment-delftx-ctb3365dwx-0',
                    is_course_ended: false,
                    instructors: [],
                    full_description: '\u003cp\u003eThis course focuses on conventional technologies for drinking water treatment. Unit processes, involved in the treatment chain, are discussed as well as the physical, chemical and biological processes involved. The emphasis is on the effect of treatment on water quality and the dimensions of the unit processes in the treatment chain. After the course one should be able to recognise the process units, describe their function, and make basic calculations for a preliminary design of a drinking water treatment plant.\u003c/p\u003e\n\u003cp\u003eThe course consists of 4 modules:\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003eIntroduction to drinking water treatment. In this module you learn to describe the important disciplines, schemes and evaluation criteria involved in the design phase.\u003c/li\u003e\n\u003cli\u003eWater quality. In this module you learn to identify the drinking water quality parameters to be improved and explain what treatment train or scheme is needed.\u003c/li\u003e\n\u003cli\u003eGroundwater treatment. In this module you learn to calculate the dimensions of the groundwater treatment processes and draw groundwater treatment schemes.\u003c/li\u003e\n\u003cli\u003eSurface water treatment. In this module you learn to calculate the dimensions of the surface water treatment processes and draw surface water treatment schemes.\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003eThis course in combination with the courses "\u003ca href="https://www.edx.org/course/introduction-water-climate-delftx-ctb3300wcx-0"\u003eIntroduction to Water and Climate\u003c/a\u003e" and "\u003ca href="https://www.edx.org/course/introduction-treatment-urban-sewage-delftx-ctb3365stx"\u003eIntroduction to the Treatment of Urban Sewage\u003c/a\u003e" forms the Water XSeries, by DelftX.\u003c/p\u003e\n\u003chr /\u003e\n\u003cp\u003e\u003cstrong\u003e\u003cem\u003eLICENSE\u003c/em\u003e\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003e\u003cem\u003eThe course materials of this course are Copyright Delft University of Technology and are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike (CC-BY-NC-SA) 4.0 International License.\u003c/em\u003e\u003c/p\u003e',
                    key: 'course-v1:DelftX+CTB3365DWx+1T2016',
                    enrollment_end: null,
                    reporting_type: 'mooc',
                    advertised_start: null,
                    mobile_available: true,
                    modified: '2017-04-06T12:26:52.652365Z',
                    is_enrolled: false,
                    pacing_type: 'instructor_paced',
                    video: {
                        src: 'http://www.youtube.com/watch?v=0xPZXLHtRJw',
                        image: {
                            src: 'https://stage.edx.org/sites/default/files/course/image/featured-card/h20_new_378x225.jpg', width: null, description: null, height: null,
                        },
                        description: null,
                    },
                }],
            }],
        },
        creditPathways: [{
            org_name: 'Bryant, Stein and Baird', email: 'paul70@yahoo.com', name: 'Give vote human.', program_uuids: ['988e7ea8-f5e2-4d2e-998a-eae4ad3af322'], description: 'After style school argue.', id: 95, destination_url: 'https://www.garrison.com/', uuid: '562bcedf-2a76-4dac-a8ba-1cb51721c566',
        }],
        industryPathways: [{
            org_name: "Industries'r'us", email: 'business@yahoo.com', name: 'Industrial Professionals', program_uuids: ['988e7ea8-f5e2-4d2e-998a-eae4ad3af322'], description: 'Sawfish.', id: 96, destination_url: 'https://www.test-example.com/', uuid: 'eb3b6b40-759e-476f-a40a-542f5a2c68a5',
        }],
        certificateData: [
            {
                url: '/certificates/a37c59143d9d422eb6ab11e1053b8eb5', type: 'course', title: 'Introduction to Water and Climate',
            }, {
                url: '/certificates/bed3980e67ca40f0b31e309d9dfe9e7e', type: 'course', title: 'Introduction to the Treatment of Urban Sewage',
            },
        ],
        urls: { program_listing_url: '/dashboard/programs/', commerce_api_url: '/api/commerce/v0/baskets/', track_selection_url: '/course_modes/choose/' },
        userPreferences: { 'pref-lang': 'en' },
    };
    /* eslint-enable */
    let programModel;
    let courseData;
    let certificateCollection;

    const testCircle = (progress) => {
        const $circle = view.$('.progress-circle');
        const incomplete = progress.in_progress.length + progress.not_started.length;

        expect($circle.find('.complete').length).toEqual(progress.completed.length);
        expect($circle.find('.incomplete').length).toEqual(incomplete);
    };

    const testText = (progress) => {
        const $numbers = view.$('.numbers');
        const total = progress.completed.length + progress.in_progress.length
      + progress.not_started.length;

        expect(view.$('.progress-heading').html()).toEqual('XSeries Progress');
        expect(parseInt($numbers.find('.complete').html(), 10)).toEqual(progress.completed.length);
        expect(parseInt($numbers.find('.total').html(), 10)).toEqual(total);
    };

    const initView = () => new ProgramSidebarView({
        el: '.js-program-sidebar',
        model: programModel,
        courseModel: courseData,
        certificateCollection,
        programRecordUrl: '/foo/bar',
        industryPathways: data.industryPathways,
        creditPathways: data.creditPathways,
        programTabViewEnabled: false,

    });

    beforeEach(() => {
        setFixtures('<div class="js-program-sidebar"></div>');
        programModel = new Backbone.Model(data.programData);
        courseData = new Backbone.Model(data.courseData);
        certificateCollection = new Backbone.Collection(data.certificateData);
    });

    afterEach(() => {
        view.remove();
    });

    it('should exist', () => {
        view = initView();
        expect(view).toBeDefined();
    });

    it('should render the progress view if there is no program certificate', () => {
        view = initView();
        testCircle(data.courseData);
        testText(data.courseData);
    });

    it('should render the program certificate if earned', () => {
        const programCert = {
            url: '/program-cert',
            type: 'program',
            title: 'And Justice For All...',
        };
        const altText = `Open the certificate you earned for the ${programCert.title} program.`;

        certificateCollection.add(programCert);
        view = initView();
        expect(view.$('.progress-circle-wrapper')[0]).not.toBeInDOM();
        const $certLink = view.$('.program-cert-link');
        expect($certLink[0]).toBeInDOM();
        expect($certLink.attr('href')).toEqual(programCert.url);
        expect($certLink.find('.program-cert').attr('alt')).toEqual(altText);
        expect(view.$('.certificate-heading')).toHaveText('Your XSeries Certificate');
    });

    it('should render the program record link', () => {
        view = initView();

        expect(view.$('.program-record-link button')).toBeInDOM();
        expect(view.$('.program-record-link').attr('href')).toEqual('/foo/bar');
    });

    it('should render the course certificate list', () => {
        view = initView();
        const $certificates = view.$('.certificate-list .certificate');

        expect(view.$('.course-list-heading').html()).toEqual('Earned Certificates');
        expect($certificates).toHaveLength(certificateCollection.length);
        $certificates.each((i, el) => {
            // eslint-disable-next-line no-undef
            const $link = $(el).find('.certificate-link');
            const model = certificateCollection.at(i);

            expect($link.attr('href')).toEqual(model.get('url'));
            expect($link.html()).toEqual(model.get('title'));
        });
    });

    it('should not render the course certificate view if no certificates have been earned', () => {
        certificateCollection.reset();
        view = initView();
        expect(view).toBeDefined();
        expect(view.$('.js-course-certificates')).toBeEmpty();
    });

    it('should render the additional credit opportunities section', () => {
        view = initView();

        expect(view.$('.program-credit-pathways .divider-heading').html()).toEqual('Additional Credit Opportunities');
        expect(view.$('.program-credit-pathways .pathway-wrapper')).toHaveLength(data.creditPathways.length);
        expect(view.$('.program-credit-pathways .pathway-link').attr('href')).toEqual(data.creditPathways[0].destination_url);
    });

    it('should render the additional professional opportunities section', () => {
        view = initView();

        expect(view.$('.program-industry-pathways .divider-heading').html()).toEqual('Additional Professional Opportunities');
        expect(view.$('.program-industry-pathways .pathway-wrapper')).toHaveLength(data.industryPathways.length);
        expect(view.$('.program-industry-pathways .pathway-link').attr('href')).toEqual(data.industryPathways[0].destination_url);
    });

    it('should not render the additional opportunities sections if no pathways exist', () => {
        const emptyView = new ProgramSidebarView({
            el: '.js-program-sidebar',
            model: programModel,
            courseModel: courseData,
            certificateCollection,
            programRecordUrl: '/foo/bar',
            industryPathways: [],
            creditPathways: [],
            programTabViewEnabled: false,
        });

        expect(emptyView.$('.program-credit-pathways .divider-heading')).toHaveLength(0);
        expect(emptyView.$('.program-industry-pathways .divider-heading')).toHaveLength(0);
    });
});
