import './SearchBar.css'
import { useState } from 'react'

const data = [
    {
      title:'park',
      location:'hoboken',
      id:1
    },
    {
      title:'bowling alley',
      location:'new york',
      id:2
    },
    {
      title:'tire swing',
      location:'hoboken',
      id:3
    }
];

interface SearchInput {
    dataToStrings: (arg0: any) => string[]
}

function levenshteinDistance(a: string, b: string): number {
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

function SearchBar(props: SearchInput) {
    const [searchTerm, setSearchTerm] = useState("");

    function showSearch() {
        data.sort(function(a :any, b: any) {
            return minimumDistance(props.dataToStrings(a), searchTerm) - minimumDistance(props.dataToStrings(b), searchTerm);
        });
        console.log(data);
    }

    function minimumDistance(string_list : string[], istring: string) {
        const mod_array = string_list.map(function(item : string) { return levenshteinDistance(istring, item); });
        return Math.min.apply(Math, mod_array);
    }

    return (
        <div className='search_container'>
            <input
                className='search'
                placeholder='Search for Cities, States, and more'
                onChange={e => setSearchTerm(e.target.value)}
                id='search'
            />
            <button className='button' onClick={showSearch}>
                <img src='https://cdn-icons-png.flaticon.com/512/49/49116.png'/>
            </button>
        </div>
    );
}

export default SearchBar;