import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import RNFetchBlob from 'rn-fetch-blob';

const config = {
    apiVersion: '2016-06-27',
    region: 'us-west-2',
    accessKeyId: 'AKIAJOV6SIDP7VHSC6BQ',
    secretAccessKey: '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',
}

const rekognition = new AWS.Rekognition(config);
import { Buffer } from 'buffer';

const mockLabels = {
    "Labels": [
        {
            "Name": "Error",
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
  
export class Services {

    // https://docs.expo.io/versions/latest/sdk/filesystem/#filesystemgetcontenturiasyncfileuri
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html#detectLabels-property
    
    async getContentByImage(image: any) {
        return new Promise(async (resolve, reject) => {

            const blob = await this.getBlob(image.uri);

            console.log('blob');
            console.log(blob);

            const params = {
                Image: {
                    Bytes: blob,
                }, 
                MaxLabels: 10, 
                MinConfidence: 70
            };
    
            rekognition.detectLabels(params, (err: any, data: any) => {

                if (err) {
                    console.log('ERRO detectLabels');
                    console.log(err);
                    // console.log(err.stack);
                    resolve(mockLabels);
                }
    
                resolve(data);
            });
        });
    }

    async selectLabel(labels: any) {
        return new Promise((resolve, reject) => {

            if (!labels && !labels.Labels) {
                reject('Não Existem Labels');
                return;
            }

            resolve(labels.Labels[0]);
        });
    }

    async getInfo(label: any) {

        console.log('------------label----------------');
        console.log(label)

        return new Promise(async (resolve, reject) => {
            const response1 = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${label.Name}`);
            if (!response1.ok) {
                // console.log(response1.statusText);
                // throw Error(response1.statusText);
                console.log('ERRO WIKI 1');
            }
            const array1 = await response1.json();
            const searchTerm = array1[0];
            const termsFound = array1[1];
            const _ = array1[2];
            const foundPages = array1[3];
            
            const term = termsFound[0].replace(' ', '%20');
            
            const response2 = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${term}`);
            if (!response2.ok) {
                // throw Error(response2.statusText);
                // console.log(response2.statusText);
                console.log('ERRO WIKI 2');
            }
            const array2 = await response2.json();
            const pagesList = array2.query.pages;
            const firstPageName = Object.keys(pagesList)[0];

            resolve(array2.query.pages[firstPageName]);
        });
    }

    async getBlob(image: any) {
        // FIXME: Resolver aqui
        return FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.UTF8 });
    }
}
