import {Formik,Form,Field} from 'formik'
import { useState } from 'react';
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos,setPhotos] = useState([])
  function open(url){
    window.open(url)
  }
  console.log({photos});
  return (
   <div>
    <header>
      <Formik
      initialValues={{search: ''}}
      onSubmit={async values =>{
        const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
          headers:{
            'Authorization' : 'Client-ID apkh4bLnId4Df-FRE9iMBMXWIddB5AR1SgsHaCj_f1g'
          }
        })
        const data = await response.json()
        //llamar a la api de unsplash
        setPhotos(data.results)
      }}>
        <Form>
          <Field name='search'></Field>
        </Form>

      </Formik>
    </header>
    <div className='container'>
      <div className='center'>
        {photos.map(foto =>
          <article key={foto.id} onClick={() => open(foto.links.html)}>
            <img src={foto.urls.regular} />
            <p>{[foto.description,foto.alt_description].join(' - ')}</p>
          </article>)}
      </div>
    </div>
   </div>
  );
}

export default App;
