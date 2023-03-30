
import AllSamplesTable from "../components/dashboard/table-all-samples"
import styles from "../styles/all-samples.module.css"
import Layout from "../components/dashboard/layout"
import { React, useState, useEffect } from 'react'
import { ref, onValue} from "firebase/database"
import { database } from "../firebaseClient"



export default function AllSamples() {

    const [samplesData, setSamplesData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStrains, setSelectedStrains] = useState([])
    const [selectedAvailability, setSelectedAvailability] = useState([])
    const [selectedPrice, setSelectedPrice] = useState({min: 0, max: 1000000})
    const [source, setSource] = useState([])
    const [sorted, setSorted] = useState({
        on: false,
        asc: false
    })
    const [type, setType] = useState([])
    const [site, setSite] = useState([])

    
    useEffect(() => {
        getSamplesData()
    }, []);
    
    function handleSearchChange(e) {
        setSearchTerm(prev => e.target.value)
    }

    function handleSourceChange(e) {
        const source = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSource(prev => [...prev, source]);
        } else {
            setSource(prev => prev.filter(s => s !== source));
        }
    }

    function handleTypeChange(e) {
        const type = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setType(prev => [...prev, type]);
        } else {
            setType(prev => prev.filter(s => s !== type));
        }
    }

    function handleStrainChange(e) {
        const strain = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedStrains(prev => [...prev, strain]);
        } else {
            setSelectedStrains(prev => prev.filter(s => s !== strain));
        }
    }

    function handleSiteChange(e) {
        const site = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSite(prev => [...prev, site]);
        } else {
            setSite(prev => prev.filter(s => s !== site));
        }
    }

    function handleAvailabilityChange(e) {
        const availability = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedAvailability(prev => [...prev, availability]);
        } else {
            setSelectedAvailability(prev => prev.filter(s => s !== availability));
        }
    }

    function handlePriceChange(e) {
        setSelectedPrice(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // fetch
    function fetchDB(path) {
        const itemsrRef = ref(database, path)
        return new Promise((resolve, reject) => {
            onValue(itemsrRef, (snapshot) => {
                resolve(snapshot.val());
            }, (error) => {
                reject(error);
            })
        })
    }

    // sets a list of objects with samples data
    function getSamplesData() {
        fetchDB('/products')
            .then((data) => {
                const list = Object.keys(data).map(uid => data[uid])
                setSamplesData(list)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function sortByPrice() {
        if (sorted.on === false) {
            setSorted(prev => {
                return {
                    ...prev,
                    on: !prev.on
                }
            })
        } else {
            setSorted(prev => {
                return {
                    ...prev,
                    asc: !prev.asc
                }
            })
        }
    }


    // filter samples based on search term
    const filteredSamplesData = samplesData.filter((sample) =>
        (sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedStrains.length === 0 || selectedStrains.includes(sample.strain)) &&
        (selectedAvailability.length === 0 || selectedAvailability.includes(sample.availability)) &&
        (sample.price >= selectedPrice.min &&  sample.price <= selectedPrice.max) &&
        (source.length === 0 || source.includes(sample.source)) &&
        (type.length === 0 || type.includes(sample.availability)) &&
        (site.length === 0 || site.includes(sample.availability)) 
    )
    
    if (sorted.on) {
        if (sorted.asc) {
            filteredSamplesData.sort((a, b) => a.price - b.price)
        } else {
            filteredSamplesData.sort((a, b) => b.price - a.price)
        }
        
    }

    return (
        <Layout>
            <div className={styles['overall']}>
                
                <div className={styles['all-samples']}>
                    <h2>All samples</h2>
                    <form 
                        className={`d-flex ${styles['search']} `}
                        role="search" 
                        >
                        <input 
                            class="form-control me-2" 
                            type="search" 
                            placeholder="Search..." 
                            aria-label="Search"
                            onChange={handleSearchChange} 
                        />   
                    </form>
                    <div className={styles['filters']}>
                        <div id="source" className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Source organism
                                </button>
                                <div className='dropdown-menu'>
                                    <div class={styles['dropdown-menu-container']}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="source" value="Human" onChange={handleSourceChange} />
                                            <label>Human</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="source" value="Animal" onChange={handleSourceChange} />
                                            <label>Animal</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <div id="strain" className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Strain
                            </button>
                            <div className='dropdown-menu'>
                                <div class={styles['dropdown-menu-container']}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="strain" value="C57BL/6J" onChange={handleStrainChange} />
                                        <label>C57BL/6J</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="strain" value="DBA2J" onChange={handleStrainChange} />
                                        <label>DBA2J</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="strain" value="CD1" onChange={handleStrainChange} />
                                        <label>CD1</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="strain" value="PWK" onChange={handleStrainChange} />
                                        <label>PWK</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="type" className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Type
                                </button>
                                <div className='dropdown-menu'>
                                    <div class={styles['dropdown-menu-container']}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="type" value="Tissue" onChange={handleTypeChange} />
                                            <label>Tissue</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="type" value="Fluids" onChange={handleTypeChange} />
                                            <label>Fluids</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="site" className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Site
                                </button>
                                <div className='dropdown-menu'>
                                    <div class={styles['dropdown-menu-container']}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="site" value="Spleen" onChange={handleSiteChange} />
                                            <label>Spleen</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="site" value="Liver" onChange={handleSiteChange} />
                                            <label>Liver</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="site" value="Whole blood" onChange={handleSiteChange} />
                                            <label>Whole blood</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Availability
                            </button>
                            <div className='dropdown-menu'>
                                <div className={styles['dropdown-menu-container']}>
                                    <div className="form-check ">
                                        <input className="form-check-input" type="checkbox" name="availability" value="In stock" onChange={handleAvailabilityChange} />
                                        <label>In stock</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="availability" value="On demand" onChange={handleAvailabilityChange} />
                                        <label>On demand</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="availability" value="Both" onChange={handleAvailabilityChange} />
                                        <label>Both</label>
                                    </div>
                                </div>  
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Price
                            </button>
                            <div className="dropdown-menu">
                                <div className={styles['price']}>
                                        <div className={styles['priceRange']}>
                                            <div>
                                                <label for="min">Min</label>
                                                <input
                                                    id="min"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder=''
                                                    onChange={handlePriceChange}
                                                    name="min"
                                                    value={selectedPrice.min}
                                                ></input>
                                            </div>
                                            <div>
                                                <label for="max">Max</label>
                                                <input
                                                    id="max"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder=''
                                                    onChange={handlePriceChange}
                                                    name="max"
                                                    value={selectedPrice.max}
                                                ></input>
                                            </div>
                                        </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        {filteredSamplesData.length > 0 && <h4 className={`${styles['results-found']}`}>We've found {filteredSamplesData.length} results</h4>}
        <AllSamplesTable samplesData={filteredSamplesData} priceAsc={sorted.asc} sortByPrice={sortByPrice}/>

        </Layout>
    )
}
