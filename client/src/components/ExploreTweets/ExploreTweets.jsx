import React , { useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Tweet from '../Tweet/Tweet.jsx'


const ExploreTweets = () => {

  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state)=> state.user);


  useEffect(() => {
    const fetchData = async () => {
        try {
            // taking the tweets of the 
            const exploreTweets = await axios.get(`/tweets/explore`);

            // setting the tweets in app to the tweets of user and he follows
            setExplore(exploreTweets.data);

        } catch (error) {
            console.log('error' , error);
        }

    }
    // callin function after this process is fininshed
    fetchData();  
} , [currentUser._id]);

  return (
    <div className='mt-6'>
    {explore && explore.map((tweet)=>{
        return (
            <div key={tweet._id} className="p-2" >
                {/* tweet to send all req tweets to show  set data when the tweet been made to add that new tweet */}
                <Tweet tweet={tweet} setData={setExplore} />
            </div>
        );
    })}
</div>

  )
}

export default ExploreTweets;
