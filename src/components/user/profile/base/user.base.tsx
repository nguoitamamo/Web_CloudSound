'use client'
import React, { useState } from "react";
import {
    Container, Typography, Avatar, Box, Chip, Grid,
    Card, CardContent, CardMedia, Divider, List, ListItem, ListItemText, Link as MuiLink, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

const skills = ["React", "TypeScript", "Node.js", "MUI", "MySQL", "Docker"];
const projects = [
    {
        title: "SoundCloud",
        linkFE: 'https://github.com/nguoitamamo/Web_CloudSound',
        linkBE: 'https://github.com/nguoitamamo/BE_nest_sound',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/soundcloud.png`,
        description: "Web nghe nhạc",
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/soudcloud.mp4`, // link video demo (YouTube iframe)
        tech: ["Next.js - MUI ( Typescripts )   ", "NestJS", "Mongodb", "Socket.io", "Stream-io"],
        features: ["Nghe nhạc trực tuyến", "JWT",
            "Playlist cá nhân",
            "Tìm kiếm bài hát",
            "Danh sách yêu thích, lịch sử",
            "Fine-tune Whiper để check file mp3 người dùng upload và chạy tự động 0h00 hàng ngày",
            "Stream-io để có thể call và share màn hình: cùng nhau nghe bài hát và trò chuyện",
            "Người dùng nâng cấp vip: nghe các bài hát vip và có thể tạo group chia sẻ bài hát cho người khác",
            "Chat real-time qua socket-io",
            "Thanh toán trực tuyến: dùng sepay",
            "Comment bài hát gắn kèm số giây",
            "Adminjs"
        ]
    },
    {
        title: "Shopping App",
        linkFE: 'https://github.com/nguoitamamo/SanThuongMaiDienTu',
        linkBE: 'https://github.com/nguoitamamo/backend',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/thuongmaidientu.png`,
        description: "Ứng dụng mua sắm.",
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/thuongmaidientu.mp4`,
        tech: ["React Native - React Native Paper", " Django Rest Framework", "MySQL"],
        features: ["Tìm kiếm theo bộ lọc",
            "Chứng thực và phân quyền phải thực hiện thông qua OAuth2",
            "Comment sản phẩm",
            "Đánh giá shop",
            "Giảm giá theo sản phẩm và danh mục",
            "Nhà cung cấp và sản phẩm nổi bật",
            "Giảm giá theo tháng/tuần, theo từng sản phẩm, từng danh mục",
            "Giỏ hàng ( redux )",
            "Lazy loading",
        ]
    },
    {
        title: "Chat HNT",
        linkFE: 'https://github.com/nguoitamamo/chat-socket',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/chathnt.png`,
        description: "Web chat bằng socket",
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/chathnt.mp4`, // link video demo (YouTube iframe)
        tech: ["Next.js - Antd ( Typescripts )   ", "Express", "Mongodb", "Socket.io"],
        features: ["Chat real-time", "Sử dụng clerk bên thứ 3 để quản lí user", "Danh sách user đang online", "Tin nhắn last - chưa đọc",
            "Tạo group", 'Chat trong group'
        ]
    },
    {
        title: "Hệ thống quản lí điểm học sinh",
        linkFE: 'https://github.com/nguoitamamo/quanlihocsinhfinal',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/hethongquanlidiemhocsinh.png`,
        description: "Web quản lí điểm học sinh cấp 3.",
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/hethongquanlidiemhocsinh.mp4`,
        tech: ["HTML, CSS, Bootstrap 5 ", "Flask ", "MySQL ", " Python"],
        features: ["Quản lí điểm học sinh",
            "Tiếp nhận học sinh - ( nhập từng học sinh hoặc tải từ file xlsx )",
            "Có kiểm tra độ tuổi phù hợp",
            "Chia lớp theo điểm theo thứ tự giảm dần",
            "Thầy cô có thể quản lí học sinh theo lớp",
            "Nhập điểm - ( Lưu tạm trước khi lưu thật vào database )",
            "Có kiểm tra điểm nhập vào",
        ]
    },
];

const Base = () => {

    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleOpen = (project: any) => {
        setSelectedProject(project);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProject(null);
    };


    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Box
                sx={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    backgroundColor: "#fff",
                    p: { xs: 3, sm: 5 },
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* Avatar */}
                        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                            <Avatar
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/huynhngoctruong.jpg`}
                                sx={{
                                    width: 180,
                                    height: 250,
                                    borderRadius: '4px',
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                                }}
                                variant="square"
                            />
                        </Grid>

                        {/* Thông tin cá nhân */}
                        <Grid item xs={12} sm={8} sx={{
                            padding: { xs: 2, sm: 3 },
                            "& a": {
                                textDecoration: 'none',
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '0.9rem',
                                mt: 0.5
                            }
                        }}>
                            <Typography variant="h4" fontWeight="bold">
                                Huỳnh Ngọc Trương
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="medium" color="primary">
                                THỰC TẬP SINH CÔNG NGHỆ THÔNG TIN
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                TP Hồ Chí Minh | huynhngoctruongg@gmail.com | 18-07-2004 | 0352175924
                            </Typography>

                            <Link href={'https://github.com/nguoitamamo'}>
                                <GitHubIcon fontSize="small" /> github.com/nguoitamamo
                            </Link>
                            <Link href={'https://huynhngoctruong.io.vn/profile'}>
                                <LanguageIcon fontSize="small" /> huynhngoctruong.io.vn/profile
                            </Link>
                        </Grid>
                    </Grid>
                </motion.div>

                {/* Giới thiệu bản thân */}
                <Box mt={4}>
                    <Typography variant="h6" fontWeight="bold">
                        GIỚI THIỆU BẢN THÂN
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <List dense>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Năng động, tiếp thu nhanh, có khả năng tự học tốt." />
                        </ListItem>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Lắng nghe tốt, ham học hỏi, yêu thích thể thao." />
                        </ListItem>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Ngoại hình ưa nhìn." />
                        </ListItem>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Tìm kiếm và xử lý lỗi tốt bằng Google." />
                        </ListItem>
                    </List>
                </Box>

                {/* Học vấn */}
                <Box mt={4}>
                    <Typography variant="h6" fontWeight="bold">
                        HỌC VẤN
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1" fontWeight="bold">
                        Công nghệ Thông tin
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                        TRƯỜNG ĐẠI HỌC MỞ TP HỒ CHÍ MINH &nbsp; &nbsp; 2022 - 2026
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />
                {/* Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Box mt={4}>

                        <Grid container >
                            {/* Technical Skills */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    KỸ NĂNG CHÍNH
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Python, JavaScript, TypeScript" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="NestJS" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Express" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Next.js" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="React & React native" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Node.js RESTful API" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Flask, Django" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="MySQL, SQL Server, MongoDB" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Socket.io và WebRTC" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Stream-io" />
                                    </ListItem>
                                </List>
                            </Grid>

                            {/* Soft Skills */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    KỸ NĂNG MỀN
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Làm việc với GITHUB ( CI/CD )" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Kiến thức cơ bản về DOCKER" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Thư viện UI: MUI, Antd, React native paper" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Kiểm thử: Selenium, Postman" />
                                    </ListItem>
                                    <ListItem>
                                        • <ListItemText sx={{ ml: 1 }} primary="Tiếng Anh: Có khả năng đọc hiểu tài liệu kỹ thuật" />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        DỰ ÁN ĐÃ THAM GIA
                    </Typography>
                    <Grid container spacing={3}>
                        {projects.map((p, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                                        }
                                    }}
                                    onClick={() => handleOpen(p)}
                                >
                                    <CardMedia component="img" height="140" image={p.image} alt={p.title} />
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {p.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {p.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Dialog hiển thị video và mô tả */}
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        {selectedProject && (
                            <>
                                <DialogTitle>{selectedProject.title}</DialogTitle>

                                <DialogContent>
                                    {/* Video demo */}
                                    <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                                        <iframe
                                            src={selectedProject.video}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%"
                                            }}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </Box>


                                    {selectedProject.linkFE &&

                                        <Link href={`${selectedProject.linkFE}`} style={{ display: "block" }} >Link: {selectedProject.linkFE}</Link>

                                    }
                                    {selectedProject.linkBE &&

                                        <Link href={`${selectedProject.linkBE}`} style={{ display: "block" }}>Link: {selectedProject.linkBE}</Link>

                                    }
                                    {/* Mô tả công nghệ */}
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
                                        Công nghệ sử dụng:
                                    </Typography>
                                    <List dense>
                                        {selectedProject.tech.map((t: string, idx: number) => (
                                            <ListItem key={idx}>
                                                • <ListItemText sx={{ ml: 1 }} primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>

                                    {/* Chức năng */}
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
                                        Chức năng chính:
                                    </Typography>
                                    <List dense>
                                        {selectedProject.features.map((f: string, idx: number) => (
                                            <ListItem key={idx}>
                                                • <ListItemText sx={{ ml: 1 }} primary={f} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                            </>
                        )}
                    </Dialog>
                </motion.div>

                <Box mt={4}>
                    <Typography variant="h6" fontWeight="bold">
                        MỤC TIÊU NGHỀ NGHIỆP
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <List dense>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Tích lũy kinh nghiệm thực tế trước khi tốt nghiệp." />
                        </ListItem>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Mong muốn học hỏi và hiểu rõ quy trình thực tế." />
                        </ListItem>
                        <ListItem>
                            • <ListItemText sx={{ ml: 1 }} primary="Phấn đấu trở thành nhân viên chính thức của công ty." />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Container>
    );
}

export default Base;
