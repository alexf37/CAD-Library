import React, { useState, useEffect } from "react";
import MainHeader from "./MainHeader";
import CategoryHeader from "./CategoryHeader";
import CategoryBanner from "./CategoryBanner";
import SearchResultDisplay from "./SearchResultDisplay";
import "~/styles/Page.css";
import axios from "axios";

const Technology = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("technology");

    let imgUrl = "";
    let title = "";
    let author = "";
    let desc = "";
    let doi = "";
    let dois = [];
    let objects = [];

    useEffect(() => {
        setSearchObjects([]);
        setSearchTerm("");
        pullAllCards();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchObjects([]);
        searchByTerm();
    };

    const pullAllCards = async () => {
        //pull all dois
        axios
            .get(
                "https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents"
            )
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i += 1) {
                    dois.push(response.data.data[i].identifier);
                }

                dois.forEach((doi) => {
                    axios
                        .get(
                            "https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/" +
                                doi
                        )
                        .then((object) => {
                            if (
                                object.data.data.latestVersion.metadataBlocks
                                    .citation.fields[5].value[0].keywordValue
                                    .value === subject
                            ) {
                                title =
                                    object.data.data.latestVersion
                                        .metadataBlocks.citation.fields[0]
                                        .value;
                                author =
                                    object.data.data.latestVersion
                                        .metadataBlocks.citation.fields[1]
                                        .value[0].authorName.value;
                                desc =
                                    object.data.data.latestVersion
                                        .metadataBlocks.citation.fields[3]
                                        .value[0].dsDescriptionValue.value;

                                let imgID = -1;
                                let files =
                                    object.data.data.latestVersion.files;

                                for (let i = 0; i < files.length; i++) {
                                    if (
                                        files[i].label
                                            .toLowerCase()
                                            .slice(-3) === "png" ||
                                        files[i].label
                                            .toLowerCase()
                                            .slice(-3) === "jpg" ||
                                        files[i].label
                                            .toLowerCase()
                                            .slice(-4) === "jpeg"
                                    ) {
                                        imgID = files[i].dataFile.id;
                                    }
                                }

                                imgUrl =
                                    "https://dataverse.lib.virginia.edu/api/access/datafile/" +
                                    imgID;

                                objects = [
                                    {
                                        imgUrl: imgUrl,
                                        title: title,
                                        author: author,
                                        desc: desc,
                                        doi: doi,
                                    },
                                    ...objects,
                                ];
                                let sortedObjects = objects.sort((obj1, obj2) =>
                                    obj1.title > obj2.title
                                        ? 1
                                        : obj1.title < obj2.title
                                        ? -1
                                        : 0
                                );
                                setSearchObjects(sortedObjects);
                            }
                        })
                        .catch((error) => console.log("Error: ", error));
                });
            })
            .catch((error) => console.log("Error: ", error));
    };

    const searchByTerm = async () => {
        // in case of empty search, return all
        if (searchTerm === "") {
            pullAllCards();
            return;
        }
        try {
            axios
                .get(
                    "https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q=" +
                        searchTerm
                )
                .then((response) => {
                    if (response.data.data.count_in_response === 0) {
                        objects = [];
                        setSearchObjects(objects);
                    }
                    for (
                        var i = 0;
                        i < response.data.data.count_in_response;
                        i += 1
                    ) {
                        dois.push(response.data.data.items[i].global_id);
                    }
                    dois.forEach((doi) => {
                        axios
                            .get(
                                "https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=" +
                                    doi
                            )
                            .then((object) => {
                                if (
                                    object.data.data.latestVersion
                                        .metadataBlocks.citation.fields[5]
                                        .value[0].keywordValue.value === subject
                                ) {
                                    title =
                                        object.data.data.latestVersion
                                            .metadataBlocks.citation.fields[0]
                                            .value;
                                    author =
                                        object.data.data.latestVersion
                                            .metadataBlocks.citation.fields[1]
                                            .value[0].authorName.value;
                                    desc =
                                        object.data.data.latestVersion
                                            .metadataBlocks.citation.fields[3]
                                            .value[0].dsDescriptionValue.value;

                                    let imgID = -1;
                                    let files =
                                        object.data.data.latestVersion.files;

                                    for (let i = 0; i < files.length; i++) {
                                        if (
                                            files[i].label
                                                .toLowerCase()
                                                .slice(-3) === "png" ||
                                            files[i].label
                                                .toLowerCase()
                                                .slice(-3) === "jpg" ||
                                            files[i].label
                                                .toLowerCase()
                                                .slice(-4) === "jpeg"
                                        ) {
                                            imgID = files[i].dataFile.id;
                                        }
                                    }

                                    imgUrl =
                                        "https://dataverse.lib.virginia.edu/api/access/datafile/" +
                                        imgID;

                                    objects = [
                                        {
                                            imgUrl: imgUrl,
                                            title: title,
                                            author: author,
                                            desc: desc,
                                            doi: doi,
                                        },
                                        ...objects,
                                    ];
                                    let sortedObjects = objects.sort(
                                        (obj1, obj2) =>
                                            obj1.title > obj2.title
                                                ? 1
                                                : obj1.title < obj2.title
                                                ? -1
                                                : 0
                                    );
                                    setSearchObjects(sortedObjects);
                                    // console.log(sortedObjects);
                                }
                            })
                            .catch((error) => console.log("Error: ", error));
                    });
                });
        } catch (err) {
            console.log("The following Data had an error");
            console.log(err);
            console.log("");
        }
    };

    return (
        <div>
            <body>
                <div className="site">
                    <MainHeader
                        input={searchTerm}
                        setInput={setSearchTerm}
                        handleSubmit={handleSubmit}
                        subject={subject}
                    ></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <CategoryBanner className="technology-banner">Technology</CategoryBanner>
                    <SearchResultDisplay
                        searchObjects={searchObjects}
                    ></SearchResultDisplay>
                </div>
            </body>
        </div>
    );
};

export default Technology;
