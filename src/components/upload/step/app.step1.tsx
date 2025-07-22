
import { useDropzone, FileWithPath } from 'react-dropzone';
import './theme.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback } from 'react';
import { useSession } from "next-auth/react"
import axios, { Axios } from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export function InputFileUpload() {



    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ background: 'black' }}
            onClick={(event) => event.preventDefault()}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button>
    );
}

export interface IProp {
    setTab: (value: number) => void;
    songUpload: {
        "name": string,
        "audio": string,
        "cover": string,
        "users": string[],
        "genres": string[],
        "state": string,
    }
    setSongUpload: (value: any) => void;
    setPercent: (value: number) => void;
}

const StepOne = ({ setTab, setSongUpload, songUpload, setPercent }: IProp) => {

    const { data: session } = useSession()


    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {


        if (acceptedFiles && acceptedFiles[0]) {
            try {
                const formData = new FormData();
                formData.append('file', acceptedFiles[0]);


                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload/audio`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.user.access_token}`,
                            'Content-Type': 'multipart/form-data',
                            folder_type: 'song',
                            type: 'audio',
                        },
                        onUploadProgress: progressEvent => {
                            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                            setPercent(percent);

                        }
                       

                    }

                )


                const fileName = res?.data?.data?.fileName;

                setSongUpload({
                    ...songUpload,
                    audio: fileName
                });

                setTab(1);

            }
            catch (error) {
                console.log(error);
            }
        }

    }, [session])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Kéo thả hoặc chọn upload file.....</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );

}

export default StepOne;
