import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import { apiVersion, region, accessKeyId, secretAccessKey } from 'react-native-dotenv';

const config = {
    apiVersion,
    region,
    accessKeyId,
    secretAccessKey,
}

const rekognition = new AWS.Rekognition(config);
import { Buffer } from 'buffer';
import { DetectLabelsRequest } from 'aws-sdk/clients/rekognition';
import { Base64EncodedString } from 'aws-sdk/clients/elastictranscoder';
import { Base64 } from 'aws-sdk/clients/ecr';
import ImgToBase64 from 'react-native-image-base64';

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

            const params: DetectLabelsRequest = {
                Image: {
                    Bytes: await FileSystem.readAsStringAsync(image.uri, { encoding: FileSystem.EncodingType.Base64 }),
                    // "S3Object": { 
                    //     "Bucket": "orb-staging",
                    //     "Name": "businesses/1001-kcrvg5df.jpg",
                    //     // "Version": "string"
                    //  }
                },
                MaxLabels: 10, 
                MinConfidence: 70
            };
    
            rekognition.detectLabels(params, (err: any, data: any) => {

                if (err) {
                    console.log('ERRO detectLabels');
                    console.log(err);
                    resolve(mockLabels);
                }
    
                console.log('data');
                console.log(data);
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

    async getBase64(uri: any): Promise<any> {
        const img = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        return new Promise((resolve, reject) => {
            ImgToBase64.getBase64String(img)
                .then((base64String: any) => {
                    console.log('base64String');
                    console.log(base64String);
                    resolve(base64String)
                })
                .catch((err: any) => reject(err));
        });
    }

}
