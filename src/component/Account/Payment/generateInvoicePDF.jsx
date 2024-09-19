import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

const generateInvoicePDF = async (invoice) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
  const page = pdfDoc.addPage([600, 700]);

  // Set up fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 12;

  // Add company header
  page.drawText('Got Next ID Camp', {
    x: 50,
    y: 650,
    size: 20,
    font: fontBold,
    color: rgb(0, 0.53, 0.71), // Custom color for the header
  });

  page.drawText('INVOICE', {
    x: 450,
    y: 650,
    size: 20,
    font: fontBold,
    color: rgb(0.95, 0.26, 0.21), // Another custom color for the title
  });

  // Draw lines to separate header
  page.drawLine({
    start: { x: 50, y: 640 },
    end: { x: 550, y: 640 },
    thickness: 2,
    color: rgb(0.65, 0.65, 0.65),
  });

  // Add invoice details
  const detailsY = 610;

  page.drawText(`Invoice ID: INV-${invoice.user.userId.slice(-6).toUpperCase()}`, {
    x: 50,
    y: detailsY,
    size: fontSize,
    font: fontBold,
  });
  page.drawText(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, {
    x: 50,
    y: detailsY - 20,
    size: fontSize,
    font,
  });
  page.drawText(`Bill To: ${invoice.user.name}`, {
    x: 50,
    y: detailsY - 60,
    size: fontSize,
    font: fontBold,
  });
  page.drawText(`Email: ${invoice.user.email}`, {
    x: 50,
    y: detailsY - 80,
    size: fontSize,
    font,
  });

  // Add subscription details
  const subscriptionY = detailsY - 120;
  page.drawText(`Plan: ${invoice.subscription.plan}`, {
    x: 50,
    y: subscriptionY,
    size: fontSize,
    font,
  });
  page.drawText(`Duration: ${invoice.subscription.duration}`, {
    x: 50,
    y: subscriptionY - 20,
    size: fontSize,
    font,
  });
  page.drawText(`Start Date: ${new Date(invoice.subscription.startDate).toLocaleDateString()}`, {
    x: 50,
    y: subscriptionY - 40,
    size: fontSize,
    font,
  });
  page.drawText(`Payment Method: ${invoice.subscription.paymentMethod}`, {
    x: 50,
    y: subscriptionY - 60,
    size: fontSize,
    font,
  });

  // Draw table headers for service details
  const tableY = subscriptionY - 100;

  page.drawText('DESCRIPTION', {
    x: 50,
    y: tableY,
    size: fontSize,
    font: fontBold,
  });
  page.drawText('UNIT PRICE', {
    x: 250,
    y: tableY,
    size: fontSize,
    font: fontBold,
  });
  page.drawText('AMOUNT', {
    x: 450,
    y: tableY,
    size: fontSize,
    font: fontBold,
  });

  // Draw table content (Service Charge)
  const itemY = tableY - 20;

  page.drawText(`Service Charge`, {
    x: 50,
    y: itemY,
    size: fontSize,
    font,
  });
  page.drawText(`$${invoice.subscription.amount.toFixed(2)}`, {
    x: 250,
    y: itemY,
    size: fontSize,
    font,
  });
  page.drawText(`$${invoice.subscription.amount.toFixed(2)}`, {
    x: 450,
    y: itemY,
    size: fontSize,
    font,
  });

  // Draw total amount
  const totalY = itemY - 40;

  page.drawLine({
    start: { x: 50, y: totalY + 30 },
    end: { x: 550, y: totalY + 30 },
    thickness: 2,
    color: rgb(0.65, 0.65, 0.65),
  });

  page.drawText('TOTAL', {
    x: 50,
    y: totalY,
    size: fontSize,
    font: fontBold,
  });
  page.drawText(`$${invoice.subscription.amount.toFixed(2)}`, {
    x: 450,
    y: totalY,
    size: fontSize,
    fontBold,
  });

  // Add footer
  page.drawText('Thank you for your subscription!', {
    x: 50,
    y: 50,
    size: fontSize,
    font: fontBold,
    color: rgb(0, 0.53, 0.71),
  });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Trigger the download of the PDF
  download(pdfBytes, `invoice_${invoice.user.userId.slice(-6).toUpperCase()}.pdf`, 'application/pdf');
};

export default generateInvoicePDF;
