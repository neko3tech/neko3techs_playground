import Card from "../components/Card";


const WorldPage = (props) => {
    return (
        <div>
            <Card
                allCountriesData={props.allCountriesData}
                getAllCountriesData={props.getAllCountriesData}
            />
        </div>
    );
};


export default WorldPage;