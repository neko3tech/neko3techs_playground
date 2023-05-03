import Title from "../components/Title";
import Card from "../components/Card";


const WorldPage = (props) => {
    return (
        <div>
            <Title />
            <Card
                allCountriesData={props.allCountriesData}
            />
        </div>
    );
};


export default WorldPage;