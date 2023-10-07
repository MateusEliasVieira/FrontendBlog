import React from "react";
import Wallp from "../../assets/images/wallp.jpg";
import Post from "../../components/post/Post.tsx";
import "./Feed.css"

const Feed:React.FC = ()=>{
    return(
        <section id="section-feed">
            <section id="section-posts">
            <Post
                titlePost="What is Lorem Ipsum?"
                srcImage={Wallp}
                nameUserPost="Mateus Elias Vieira"
                datePublishPost="06/10/2023"
                widthImage="100%"
                heightImage="200"
                contentPost="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."
              />
                <Post
                titlePost="What is Lorem Ipsum?"
                srcImage={Wallp}
                nameUserPost="Mateus Elias Vieira"
                datePublishPost="06/10/2023"
                widthImage="100%"
                heightImage="200"
                contentPost="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."
              />
                <Post
                titlePost="What is Lorem Ipsum?"
                srcImage={Wallp}
                nameUserPost="Mateus Elias Vieira"
                datePublishPost="06/10/2023"
                widthImage="100%"
                heightImage="200"
                contentPost="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."
              />
                <Post
                titlePost="What is Lorem Ipsum?"
                srcImage={Wallp}
                nameUserPost="Mateus Elias Vieira"
                datePublishPost="06/10/2023"
                widthImage="100%"
                heightImage="200"
                contentPost="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."
              />
                <Post
                titlePost="What is Lorem Ipsum?"
                srcImage={Wallp}
                nameUserPost="Mateus Elias Vieira"
                datePublishPost="06/10/2023"
                widthImage="100%"
                heightImage="200"
                contentPost="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."
              />
            </section>
        </section>
    )
}

export default Feed;