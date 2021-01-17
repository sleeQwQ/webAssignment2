/* eslint-disable no-undef */
import chai from "chai";
import request from "supertest";
import Movie from "../../../../api/movies/movieModel";
import loglevel from 'loglevel';

const expect = chai.expect;

let api;
let token;

const sampleMovie = {
  id: 337401,
  title: "Mulan",
  reviews: [
    {
        "author": "msbreviews",
        "author_details": {
            "name": "",
            "username": "msbreviews",
            "avatar_path": "/https://secure.gravatar.com/avatar/992eef352126a53d7e141bf9e8707576.jpg",
            "rating": 4
        },
        "content": "If you enjoy reading my Spoiler-Free reviews, please follow my blog @\r\nhttps://www.msbreviews.com\r\n\r\nAs you might now, this remake is one of my most anticipated movies of 2020 (list here). I've at least \"liked\" almost every remake Disney has delivered so far, so I was incredibly excited that 1998's Mulan was getting the same treatment. Niki Caro made it clear this would be an entirely different version of the story we all know and love. A more realistic take on the Chinese tale, one that removes all songs and fan-favorite characters like Mushu, which instantly impacted expectations, varying tremendously from person to person. People who would love a remake quite similar to the original will enter the film already slightly discouraged. However, to everyone who complained about Disney copying their original IP, Mulan might be their best chance to like a remake from the studio.\r\n\r\nIn my opinion, a remake should have a bit of both. It must keep the original's essence and message while delivering something that distinguishes it from the former. Any remake must always prove the reasons behind its existence. It must have something that makes the viewers think: \"I like this part that's not in the original\". Aladdin has a new arc given to Jasmine. Beauty and the Beast provides Beast with a better-developed storyline. Even The Lion King, a remake that convinced many people to call it a shot-for-shot (it isn't), presents a groundbreaking visual experience that's incomparable to the original. Therefore, I was genuinely hyped for Mulan and what Niki Caro could bring with her more pragmatic cut...\r\n\r\nI can't deny it: I feel extremely disappointed. In my review of the original movie, I mention how epic and cinematic it feels. It was one of the aspects I looked forward to the most in this new version. Despite the beautiful set design and some painting-like shots, this is the first time a Disney's live-action remake loses to its original regarding its visuals. The 2D animation from more than twenty years ago feels superior in every single aspect. There's only one shot in the entire remake that I would put in the original, and I bet it would look and feel a lot more emotionally significant. The action sequences are unimaginative and incredibly disjointed. Except for a few great war moments, most action scenes are packed with excessive CGI, a badly employed HFR (high frame rate), and overediting.\r\n\r\nIn fact, the editing (David Coulson) is weirdly overworked throughout the entire runtime, cutting too much and omitting sequences that were supposed to significantly impact the narrative. From character-defining moments to simple connections between scenes, it feels like the film is hiding something. I constantly needed to rely on my knowledge of the original to remember why certain moments are meaningful to a character or to the story itself because this remake straight-up removes these moments without replacing them with something else. Even in chronological terms, it's clumsily put together, jumping from location to location without actually showing the characters moving from one place to another.\r\n\r\nFinally, as my last remark on the technical aspects, Harry Gregson-Williams' score is partially also a letdown. Like the rest of the movie, there are some nice touches and lovely homages to the songs everyone cherishes, especially Reflection. I had already mentalized myself to ignore the absence of songs because I believed Harry would find a way to replace them with a similarly grand score that I would definitely enjoy. However, Mulan's score fails not only to elevate a single battle sequence but also to deliver that cinematic atmosphere that I was looking forward to so much. I didn't get chills during the entire film. It didn't transform any big character moments. Maybe watching it on IMAX instead of at home might improve my opinion, but I doubt that.\r\n\r\nStory-wise, it's a mixed bag for me. Niki Caro promised a more realistic take, totally different from the original, and she undoubtedly accomplished that. This is the furthest from the original any Disney remake has been, by far. From the replacement of characters to an overall change to the main narrative, Mulan is more faithful to the original Chinese tale than the 1998's flick, but that doesn't mean it's better, much on the contrary. The essence and message are there but told through a distinct perspective, which some people will find hard to accept, especially hardcore fans of the original movie. However, I do believe that Hua Mulan still carries the characteristics that made me care about her.\r\n\r\nHer courage and bravery to go to war in order to save her father from certain death. Her love and devotion to her family, who she wants to honor. Hua Mulan doesn't want to just be the wife of some random man nor be imprisoned by dated stereotypes. This is all in the remake but told through the lenses of a protagonist who already has everything she needs to lead a nation. This is the main difference character-wise, but one that doesn't affect the nature of the original. However, it impacts the remake itself. While all of this sounds amazing, Mulan sort of contradicts itself by making her main character feel unique and different from everyone else, distancing her more from people than actually embracing her.\r\n\r\nLike I already mentioned above, this is an entirely altered version of the story everyone knows. I do welcome every change made, including the removal of Mushu, Cri-Kee, and all of the singing. However, if something's removed, something else has to replace it in some shape or form. Once again, I have mixed feelings. Some additions, like the introduction of Chi and the witch Xian Lang (Gong Li), are refreshing but poorly developed throughout the runtime. The vital energy force is connected to my issue with the \"be yourself\" message, while the character not only follows a predictable arc, but it diminishes Bori Khan's (Jason Scott Lee) menacing presence.\r\n\r\nThe ending feels remarkably underwhelming as well. Not only the climactic fight between Hua Mulan and Bori Khan fails to live up to expectations, but it's executed in a visually disheartening fashion. I expected this remake to feel grand, magnificent, epic, and cinematic, just like its original or even better. It's far from that. The acting could also be better. Liu Yifei is fantastic as Hua Mulan, Yoson An offers a subtle yet efficient interpretation of Chen Honghui, and the actors who portray Yao (Chen Tang), Ling (Jimmy Wong), and Chien-Po (Doua Moua) are also amusing. However, Donnie Yeng as Commander Tung and Jet Li as The Emperor are embarrassingly bland, while Jason Scott Lee is visually perfect casting as the main villain, but he's not able to shine.\r\n\r\nIn the end, Mulan is the most disappointing remake Disney has made so far and by far. Even though Niki Caro delivers the realistic, distinct take that was promised, its execution feels inferior to the original animated film in every single way. Technically and visually, it's the first live-action remake from the respective studio that loses in almost every aspect to the 2D animation from more than twenty years ago. The 1998's movie is far more epic and cinematic than its remake. The disjointed editing is overworked to the point of omitting and skipping through character-defining moments. The action scenes are packed with unnecessary CGI that takes away from the war set pieces, which also look small in scale. The musical score isn't able to replace the songs from the original, overflowing the film with a weirdly empty feeling. Despite Liu Yifei delivering a good performance as the protagonist as well as a few of her colleagues, the acting is pretty mediocre overall. Story-wise, it's a mixed bag. It's an undoubtedly unique version, the furthest that a Disney's remake has ever been from its original, which will instantly upset some and please others. I praise the courage and bravery in producing such a different version. There are dozens of new additions that I sincerely appreciate, but their execution lacks emotional impact, ultimately being decisions inferior to the ones of the original. The message and essence of the original are still present through another perspective, which is the best compliment I can give to an otherwise quite disappointing remake...\r\n\r\nRating: C-",
        "created_at": "2020-09-05T12:32:23.063Z",
        "id": "5f538557904f6d0038392154",
        "updated_at": "2020-09-06T00:04:33.572Z",
        "url": "https://www.themoviedb.org/review/5f538557904f6d0038392154"
    },
    {
        "author": "Kamurai",
        "author_details": {
            "name": "Kamurai",
            "username": "Kamurai",
            "avatar_path": "/sKeC7qZLAKreuwxH4x6U3mN7Aa8.jpg",
            "rating": 5
        },
        "content": "Disappointing watch, probably won't watch again, and can't recommend.\r\n\r\nI finally see what everyone is freaking out about this movie.  Mostly, it is because it just left all the spirit of the first movie behind and started over. \r\n\r\nThey made a conscious effort to ditch the goofiness, and magic animals of the first one to do a more gritty and real version, like a DC movie.  After those decisions, they also chose to reintroduce actual magic, but mostly for the villains, who had slightly better women's rights(?).\r\n\r\nI'll be honest, the movie itself wasn't interesting enough to follow completely.  For instance, I know \"Mushu\" was replaced with a phoenix, but I have no idea what happened to it.\r\n\r\nMulan also is outed much sooner in this, but basically skirts execution about 3 different times because of her accomplishments with a much more laid back atmosphere than it was in the 1998 version.\r\n\r\nDespite all the money poured into the movie that keeps it from being a bad movie, it just doesn't feel good.  While it is wonderous at times, it just lacks the heart warming charm that one would expect from a Disney movie.",
        "created_at": "2020-12-10T17:05:26.729Z",
        "id": "5fd25556d7cd06003f7fc60f",
        "updated_at": "2020-12-19T18:40:11.291Z",
        "url": "https://www.themoviedb.org/review/5fd25556d7cd06003f7fc60f"
    }
  ]
};

describe("Movies endpoint", function (){
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
    } catch (err) {
      loglevel.info(`failed to Load Data: ${err}`);
    }
    return request(api)
        .post("/api/authentication")
        .send({
          username: "user1",
          password: "test1",
        })
        .expect(200)
        .then((res) => {
          token= res.body.token;
        });
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  
  describe("GET /movies ", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("POST /movies", () => {
    describe("post movie with id", () => {
      it("should return the new movie and a status 201", () => {
        return request(api)
        .post("/api/movies")
        .set("Authorization", token)
        .send({
          id : 20091632,
          title : "test",
          contains : "test"
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property("id",20091632);
          expect(res.body).to.have.property("title","test");
        });
      });
    });
    describe("post movie without id", () => {
      it("should generate id automatically", () => {
        return request(api)
        .post("/api/movies")
        .set("Authorization", token)
        .send({
          title : "test",
          contains : "test"
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property("title","test");
          expect(res.body).to.have.property("id");
        });
      });
    });
    describe("when no title", () => {
      it("should return the message of asking for a title", () => {
        return request(api)
        .post("/api/movies")
        .set("Authorization", token)
        .send({
          contains : "test"
        })
        .expect(412)
        .expect({ code: 412,  msg: 'Please add a title' });
      });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message when input is not a number", () => {
        return request(api)
          .get(`/api/movies/xxx`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
      it("should return the NOT found message when not found this id", () => {
        return request(api)
          .get(`/api/movies/111`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'The resource you requested could not be found.'});
      });
    });
  });

  describe("PUT /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return success message and a status 200", () => {
        return request(api)
          .put(`/api/movies/${sampleMovie.id}`)
          .set("Authorization", token)
          .send({
            title : "test"
          })
          .expect(201)
          .then((res) => {
            expect(res.body).to.have.property("title","test");
          });
      });
      after(()=>{
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title","test");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message", () => {
        return request(api)
          .put(`/api/movies/xxx`)
          .set("Authorization", token)
          .send({
            title : "test",
          })
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
    });
  });

  describe("DELETE /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return success message and a status 200", () => {
        return request(api)
          .delete(`/api/movies/${sampleMovie.id}`)
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({ code: 200, msg: 'Delete successfully'});
      });
      after(()=>{
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'The resource you requested could not be found.'});
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message", () => {
        return request(api)
          .delete(`/api/movies/xxx`)
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
    });
  });

  describe("GET /movies/:id/reviews", () => {
    describe("when the id is valid", () => {
      it("should return the movie's reviews", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}/reviews`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property("author", "msbreviews");
            expect(res.body[0]).to.have.property("id", "5f538557904f6d0038392154");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message", () => {
        return request(api)
          .get(`/api/movies/xxx/reviews`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
    });
    describe("when there are no reviews that movie", () => {
      it("should return no reviews message", () => {
        return request(api)
          .get(`/api/movies/211/reviews`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'No reviews yet in this movie.'});
      });
    });
  });
});