import AllSamplesTable from "../components/dashboard/table-all-samples"
import styles from "../styles/all-samples.module.css"
import searchStyles from "../styles/ds-layout.module.css"

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
    const [sorted, setSorted] = useState(false)


    useEffect(() => {
        getSamplesData()
    }, []);
    
    function handleSearchChange(e) {
        setSearchTerm(prev => e.target.value)
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

    // filter samples based on search term
    const filteredSamplesData = samplesData.filter((sample) =>
        (sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedStrains.length === 0 || selectedStrains.includes(sample.strain)) &&
        (selectedAvailability.length === 0 || selectedAvailability.includes(sample.availability)) &&
        (sample.price >= selectedPrice.min &&  sample.price <= selectedPrice.max)
    )
    
    if (sorted) {
        filteredSamplesData.sort((a, b) => a.price - b.price)
    }
    


    return (
        <Layout>
            <h2>Search samples</h2>
            <div className={styles['filters']}>
                <form 
                    className={`d-flex ${searchStyles['search']} `}
                    role="search" 
                    >
                    <input 
                        class="form-control me-2" 
                        type="search" 
                        placeholder="Search catalog..." 
                        aria-label="Search"
                        onChange={handleSearchChange} 
                    />   
                </form>
                <div>
                    <label>Filter by strain:</label>
                    <div>
                        <input type="checkbox" name="strain" value="C57BL/6J" onChange={handleStrainChange} />
                        <label>C57BL/6J</label>
                    </div>
                    <div>
                        <input type="checkbox" name="strain" value="DBA2J" onChange={handleStrainChange} />
                        <label>DBA2J</label>
                    </div>
                    <div>
                        <input type="checkbox" name="strain" value="CD1" onChange={handleStrainChange} />
                        <label>CD1</label>
                    </div>
                    <div>
                        <input type="checkbox" name="strain" value="PWK" onChange={handleStrainChange} />
                        <label>PWK</label>
                    </div>
                </div>
                <div>
                    <label>Filter by availability:</label>
                    <div>
                        <input type="checkbox" name="availability" value="In stock" onChange={handleAvailabilityChange} />
                        <label>In stock</label>
                    </div>
                    <div>
                        <input type="checkbox" name="availability" value="On demand" onChange={handleAvailabilityChange} />
                        <label>On demand</label>
                    </div>
                    <div>
                        <input type="checkbox" name="availability" value="Both" onChange={handleAvailabilityChange} />
                        <label>Both</label>
                    </div>
                </div>
                <div class="mb-3">
                    <label for='price' class="form-label">Price</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder=''
                        onChange={handlePriceChange}
                        name="min"
                        value={selectedPrice.min}
                    ></input>
                    <input
                        type="text"
                        class="form-control"
                        placeholder=''
                        onChange={handlePriceChange}
                        name="max"
                        value={selectedPrice.max}
                    ></input>
                </div>
                <button onClick={() => setSorted(prev => !prev)}>Sort by price</button>
            </div>
            <AllSamplesTable samplesData={filteredSamplesData} />
        </Layout>
    )
}

