// var AWS = require('aws-sdk/dist/aws-sdk-react-native');

export class Services {
    
    getContentByImage(image: any): object {
        return {
            "Labels": [
                {
                    "Name": "Urban",
                    "Confidence": 99.18706512451172,
                    "Instances": [],
                    "Parents": []
                },
                {
                    "Name": "City",
                    "Confidence": 99.18706512451172,
                    "Instances": [],
                    "Parents": [
                        {
                            "Name": "Urban"
                        },
                        {
                            "Name": "Building"
                        }
                    ]
                },
                {
                    "Name": "Town",
                    "Confidence": 99.18706512451172,
                    "Instances": [],
                    "Parents": [
                        {
                            "Name": "Urban"
                        },
                        {
                            "Name": "Building"
                        }
                    ]
                },
                {
                    "Name": "Building",
                    "Confidence": 99.18706512451172,
                    "Instances": [],
                    "Parents": []
                },
                {
                    "Name": "Metropolis",
                    "Confidence": 98.57975769042969,
                    "Instances": [],
                    "Parents": [
                        {
                            "Name": "City"
                        },
                        {
                            "Name": "Urban"
                        },
                        {
                            "Name": "Building"
                        }
                    ]
                },
                {
                    "Name": "High Rise",
                    "Confidence": 98.23906707763672,
                    "Instances": [],
                    "Parents": [
                        {
                            "Name": "City"
                        },
                        {
                            "Name": "Urban"
                        },
                        {
                            "Name": "Building"
                        }
                    ]
                },
                {
                    "Name": "Office Building",
                    "Confidence": 94.11907958984375,
                    "Instances": [],
                    "Parents": [
                        {
                            "Name": "Building"
                        }
                    ]
                },
                {
                    "Name": "Water",
                    "Confidence": 92.10189056396484,
                    "Instances": [],
                    "Parents": []
                },
                {
                    "Name": "Outdoors",
                    "Confidence": 92.03972625732422,
                    "Instances": [],
                    "Parents": []
                },
                {
                    "Name": "Nature",
                    "Confidence": 87.20903778076172,
                    "Instances": [],
                    "Parents": []
                },
            ],
            "LabelModelVersion": "2.0"
        };
    }

    selectLabel(labels: any) {
        if (!labels && !labels.Labels) {
            return;
        }

        return labels.Labels[0];
    }

    async getInfo(label: any) {
        const response1 = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${label.Name}`);
        if (!response1.ok) {
            console.log(response1.statusText);
            // throw Error(response1.statusText);
        }
        const array1 = await response1.json();
        const searchTerm = array1[0];
        const termsFound = array1[1];
        const _ = array1[2];
        const foundPages = array1[3];

        const term = termsFound[0].replace(' ', '%20');
        console.log('term');
        console.log(term);

        const response2 = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${term}`);
        if (!response2.ok) {
            // throw Error(response2.statusText);
            console.log(response2.statusText);
        }
        const array2 = await response2.json();
        const pagesList = array2.query.pages;
        const firstPageName = Object.keys(pagesList)[0];

        return array2.query.pages[firstPageName];
    }

}