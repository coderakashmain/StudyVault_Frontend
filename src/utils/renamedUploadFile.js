 const handleUpload = async (selectedFile) => {
        if (selectedFile) {
            const newFileName = `${filtetuploaddata.departmentName}_${filtetuploaddata.studentyear}_${filtetuploaddata.dptyear}_${filtetuploaddata.paperName}_${filtetuploaddata.semormid}_${filtetuploaddata.educationLavel}_${filtetuploaddata.session}.pdf`;
            // Rename the file
            const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });
            const watermarkedFile = await addWatermark(renamedFile, 'StudyVault - Protected');
            return watermarkedFile;
        }
        return null;
    };

    export default handleUpload