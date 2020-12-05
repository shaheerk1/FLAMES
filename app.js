

function result(){

    let he = document.getElementById("nameone").value;
    let she = document.getElementById("nametwo").value;

    let flames_output =(getFlame(he , she));
    document.getElementById("demo").innerHTML = flames_output;
}







const getFlame = (name1, name2) =>
    name1.toLowerCase().split('').                                                      // take all characters in "name1", to compare
        filter(c => name2.toLowerCase().includes(c)).                                       // keep only characters (in "name1") also found in "name2"
        reduce((result, c) => [
            result[0].replace(new RegExp(`${c}`, 'g'), ''),                                   // replace common characters in "name1"
            result[1].replace(new RegExp(`${c}`, 'g'), '')                                    // replace common characters in "name2"
        ], [name1.toLowerCase(), name2.toLowerCase()]).
        reduce((length, letters) => [length.shift() + letters.length], [0]).                // determine length of characters left, after removal
        map(length => {
            const findStop = (flames, startAt) => {
                if (flames.length === 1) return flames;                                         // stop, if one flame character is left
                const position = new Array(length).fill(0).                                     // move "length" number of times
                    reduce(beginAt => beginAt + 1 > flames.length ? 1 : beginAt + 1, startAt - 1) // determine where to stop, in one move
                flames.splice(position - 1, 1);                                                 // remove the "flame" character where we stopped
                return findStop(flames, position);                                              // find the next stop
            };
            return findStop('FLAMES'.split(''), 1)[0];                                        // begin finding stops
        }).
        map(result =>
            ['Friendship', 'Love', 'Affection', 'Marriage', 'Enemy', 'Sibling'].
                filter(flame => flame.toLowerCase().startsWith(result.toLowerCase()))[0]        // present result in readable form
        )[0];

