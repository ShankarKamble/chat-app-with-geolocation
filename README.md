## How to run the app

Install the modules:

```
npm install
```

Set envrionment varaiables 

```
export NPPES_URL="https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=200" PORT=5000 PARALLELREQUEST=50
```

Run the app  

```
npm run start
```

Appliction will be running at http://localhost:5000 , so please open browser and go to http://localhost:5000


lint 

```
npm run lint
```

## Available data

It uses either first name, last name or both to find the data.

The available data are from :

- Full Name ( Firstname +' '+MiddleName+' '+LastName)
- Address
- Telephone of the Address
- Fax of the Address
- Occupation
- Organisation (Potential): I found that the address might contains an organisation, like "DEPARTMENT OF FAMILY MEDICINE", unfortunately, it doesn't contains the top organisation. Alternatively, we may find the address in maps/geolocation to find what's the organisation building is, (An hospital, university, etc).
- Associated Organisation: There are some health organisations listed in the data. It is not directly related to the person's organisation, but it seem there is connection between that.

## Note

1) envrionment varaiables 

```
export NPPES_URL="https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=200" PORT=5000 PARALLELREQUEST=50
```

NPPES_URL :  URL NPPES API with version. limit 200 ,means max 200 records will received from NPPES

PORT : Apllication will run on this port

PARALLELREQUEST : Needed to implement PARALLELISM. Number of records from excel will used to get records from NPPES in parallel. e,g PARALLELREQUEST=50 - 

LOG_LEVEL : Set log level  of application by default is info. For debug mode set LOG_LEVEL=debug

2) UI -  Used bootstrap 5 , Jquery. Sample excel with correct format , worksheet name and column names can be downloaded in UI. 

Please upload the excel file with data in the required format same as samole excel sheet file.

After a file is uploaded and data processing is completed, Download button will be enabled to download the output report file.

3) PARALLELISM -  Apllication will work through the rows in parallel. PARALLELREQUEST Number of records from excel will used to get records from NPPES in parallel.

Below is the table, show the time taken by upload the file, data processing and create output file for all records of excel.   

PARALLELREQUEST              | 10    | 20    | 30    | 40    | 50    | 
---                          | ---   | ---   | ---   | ---   | ---   |
Completed in Seconds         | 63-66 | 60-63 | 55-58 | 52-55 | 48-53 | 

4) If error occurs like listen EADDRINUSE: address already in use :::5000 

   ```
      Error: listen EADDRINUSE: address already in use :::5000
      at Server.setupListenHandle [as _listen2] (node:net:1372:16)
      at listenInCluster (node:net:1420:12)
      at Server.listen (node:net:1508:7 
  ```
 
    then  please kill the process of PORT 5000 using below 
    
    
    ```
    sudo lsof -i :5000 , 
    ```
    COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
    node 20152 abc 21u IPv6 195004 0t0 TCP *:http (LISTEN)
    
    ```
    sudo kill -9 20152
    ```

