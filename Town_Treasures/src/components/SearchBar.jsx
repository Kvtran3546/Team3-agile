import { useState } from 'react'
import '../css/SearchBar.css'

function levenshteinDistance(a, b) {
    // Create a 2D array to store the distances
    let distances = new Array(a.length + 1);
    for (let i = 0; i <= a.length; i++) {
        distances[i] = new Array(b.length + 1);
    }

    // Initialize the first row and column
    for (let i = 0; i <= a.length; i++) {
        distances[i][0] = i;
    }
    for (let j = 0; j <= b.length; j++) {
        distances[0][j] = j;
    }

    // Fill in the rest of the array
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                distances[i][j] = distances[i - 1][j - 1];
            } else {
                distances[i][j] = Math.min(distances[i - 1][j], distances[i][j - 1], distances[i - 1][j - 1]) + 1;
            }
        }
    }

    // Return the final distance
    return distances[a.length][b.length];
}

function SearchBar(props) {
    // what is in the search bar
    const [searchTerm, setSearchTerm] = useState("");

    // convert items in props.data to string by props.dataToStrings method
    // Then sort by string closeness to current search term
    function sortSearch() {
        // out of all search terms from data items, get most similarity
        function minimumDistance(string_list, istring) {
            // convert string list to list of distances from input string
            const mod_array = string_list.map((item) => levenshteinDistance(istring, item));
            // minimum distance
            return Math.min.apply(Math, mod_array);
        }
        // sort data based on smallest minimum leve distance
        props.data.sort(function(a, b) {
            return minimumDistance(props.dataToStrings(a), searchTerm) - minimumDistance(props.dataToStrings(b), searchTerm);
        });
        // print for debugging
        console.log(props.data);
        // erase search bar
        setSearchTerm('');
    }

    // return search bar, input + button
    return (
        <div className='search_container'>
            <input
                className='search'
                placeholder='Search for Cities, States, and more'
                onChange={e => setSearchTerm(e.target.value)}
                id='search'
                value={searchTerm}
            />
            <button className='button' onClick={sortSearch}/>
        </div>
    );
}

export default SearchBar;