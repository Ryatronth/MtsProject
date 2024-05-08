package com.example.backend.service;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.order.Order;
import com.example.backend.service.entityProcessing.entityFilter.EntityFilterService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PdfService {
    private final EntityFilterService entityFilterService;

    public byte[] createMenu(LocalDate date) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            contentStream.setStrokingColor(Color.DARK_GRAY);
            contentStream.setLineWidth(1);

            int pageHeight = (int) page.getMediaBox().getHeight();

            PDType0Font font = PDType0Font.load(document, new File("src/main/resources/arialmt.ttf"));

            contentStream.addRect(50, pageHeight - 50, 400, -30);
            contentStream.beginText();
            contentStream.newLineAtOffset(50 + 10, pageHeight - 50 - 30 + 10);
            contentStream.setFont(font, 18);
            contentStream.showText("Наименование");
            contentStream.endText();
            contentStream.addRect(450, pageHeight - 50, 100, -30);
            contentStream.beginText();
            contentStream.newLineAtOffset(450 + 10, pageHeight - 50 - 30 + 10);
            contentStream.setFont(font, 18);
            contentStream.showText("Кол-во");
            contentStream.endText();


            int cellHeight = 30;
            int cellWidth1 = 400;
            int cellWidth2 = 100;

            int initX = 50;
            int initY = pageHeight - 50 - cellHeight;

            Map<String, Long> data = getDishesCount(date);

            for (Map.Entry<String, Long> entry : data.entrySet()) {
                for (int j = 0; j < 2; j++) {
                    if (j == 0) {
                        contentStream.addRect(initX, initY, cellWidth1, -cellHeight);
                    } else {
                        contentStream.addRect(initX, initY, cellWidth2, -cellHeight);
                    }

                    contentStream.beginText();
                    contentStream.newLineAtOffset(initX + 10, initY - cellHeight + 10);
                    contentStream.setFont(font, 18);
                    if (j == 0) {
                        contentStream.showText(entry.getKey());
                    } else {
                        contentStream.showText(entry.getValue().toString());
                    }
                    contentStream.endText();

                    if (j == 0) {
                        initX += cellWidth1;
                    } else {
                        initX += cellWidth2;
                    }
                }
                initX = 50;
                initY -= cellHeight;

                if (initY <= 50) {
                    contentStream.stroke();
                    contentStream.close();

                    page = new PDPage();
                    document.addPage(page);
                    contentStream = new PDPageContentStream(document, page);
                    initY = pageHeight - 50;
                }
            }

            contentStream.stroke();
            contentStream.close();

//            document.save("test.pdf");

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        } catch (IOException ex) {
            throw new CreationException("Ошибка при создании файла");
        }
    }

    private Map<String, Long> getDishesCount(LocalDate date) {
        Map<String, Long> dishCount = new HashMap<>();

        List<Order> orders = entityFilterService.getOrder("date", date);
        for (Order order : orders) {
            List<Dish> dishes = entityFilterService.getOrderMenu("order", order.getId()).stream().map(MenuDish::getDish).toList();
            for (Dish dish : dishes) {
                dishCount.put(dish.getName(), dishCount.getOrDefault(dish.getName(), 1L) + 1);
            }
        }

        return dishCount;
    }
}