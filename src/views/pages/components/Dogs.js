
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { publicFetch } from "util/fetcher";
import axios from "axios";


function Dogs() {
  const [breeds, setBreeds] = useState([]);
  const [dogindex, setDogIndex] = useState(1);
  const [dogid, setDogid] = useState(1);
  const [dogname, setDogName] = useState("");
  const [dogweight, setDogWeight] = useState("");
  const [dogbredfor, setDogBredFor] = useState("");
  const [dogtemperament, setDogTemperament] = useState("");
  const [dogimg, setDogImage] = useState("");

  const lang_names = ['Spainish', 'Russian', 'Japanese'];
  const langs = ['es', 'ru', 'ja'];
  const [currentLangIndex, setCurrentLangIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await publicFetch.get('/breeds', {});
        setBreeds(data)
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  useEffect(() => {
    setDogid(breeds[dogindex]?.id)
    setDogName(breeds[dogindex]?.name)
    setDogWeight(breeds[dogindex]?.weight.metric + "kgs")
    setDogBredFor(breeds[dogindex]?.bred_for)
    setDogTemperament(breeds[dogindex]?.temperament)
    setDogImage(breeds[dogindex]?.image.url)
  }, [breeds, dogindex]);

  const translate = async () => {
    let new_bred_for = await translateAPI(dogbredfor, langs[currentLangIndex]);
    setDogBredFor(new_bred_for)

    let new_temperament = await translateAPI(dogtemperament, langs[currentLangIndex]);
    setDogTemperament(new_temperament)
  }

  const translateAPI = async (text, target = "ko") => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);
    encodedParams.set('target', target);
    encodedParams.set('source', 'en');

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '4cc3affaacmsha13cad708dc632cp10c5d4jsneb234d511150',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data?.data?.translations[0]?.translatedText);
      return (data?.data?.translations[0]?.translatedText);
    } catch (error) {
      console.error(error);
      return ("Something went wrong...")
    }
  }

  return (
    <>
      <Container className="mt-100" fluid>
        <Row className="card-wrapper">
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="exampleFormControlSelect3"
              >
                Select Breed
              </label>
              <Input id="exampleFormControlSelect3" type="select" onChange={(e) => setDogIndex(e.target.value)}>
                {
                  breeds.map((item, index) => <option value={index}>{item.name}</option>)
                }
              </Input>
            </FormGroup>
            <Card>
              <CardImg
                alt="..."
                src={dogimg}
                top
              />

              <CardBody>

                <CardTitle className="h2 mb-0">
                  {dogname}
                </CardTitle>

                <small className="text-muted">
                  {dogweight}
                </small>
                <CardText className="mt-4">
                  {dogbredfor}
                </CardText>
                <CardText className="mt-4">
                  {dogtemperament}
                </CardText>

              </CardBody>
            </Card>

            {/* translate */}
            <Card>
              <CardBody>
                <h1>Translate</h1>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="exampleFormControlSelect3"
                  >
                    Select Language
                  </label>
                  <Input id="exampleFormControlSelect3" type="select" onChange={(e) => setCurrentLangIndex(e.target.value)}>
                    {
                      lang_names.map((item, index) => <option value={index}>{item}</option>)
                    }
                  </Input>
                </FormGroup>
                <Button
                  className="px-0"
                  color="link"
                  onClick={() => translate()}
                >
                  Translate
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dogs;
